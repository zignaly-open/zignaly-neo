import { AuctionStatus } from '@zigraffle/shared/types';
import pubsub from '../../pubsub';
import { AUCTION_BID_ADDED } from './constants';
import { Auction, AuctionBasketItem, AuctionBid } from './model';
import { Includeable } from 'sequelize';
import { ApolloContext, ContextUser } from '../../types';
import { auctionTtlPerBid } from '../../../config';
import { User } from '../users/model';
import { sequelize } from '../../db';
import { Transaction, TransactionType } from '../transactions/model';
import {
  emitBalanceChanged,
  getUserBalance,
  negative,
} from '../transactions/util';
import {
  getMinRequiredBidForAuction,
  isBalanceSufficientForBid,
} from './util';

const lastBidPopulation = {
  model: AuctionBid,
  as: 'bids',
  order: [['id', 'DESC']],
  limit: 1,
  include: [User],
} as Includeable;

async function getAuctions(id: number, user: ContextUser) {
  const lastUsersBidPopulation = {
    model: AuctionBid,
    order: [['id', 'DESC']],
    limit: 1,
    as: 'userBid',
    where: { userId: user?.id },
  } as Includeable;

  const auctions = (
    await Auction.findAll({
      where: { ...(id ? { id } : {}) },
      include: [AuctionBasketItem, lastBidPopulation].concat(
        user ? lastUsersBidPopulation : [],
      ),
    })
  ).map((x) => x.toJSON());
  auctions.forEach(
    (x) => (x.minimalBid = getMinRequiredBidForAuction(x, x.bids[0])),
  );
  return auctions;
}

export const resolvers = {
  Query: {
    auctions: async (
      _: any,
      { id }: { id: number },
      { user }: ApolloContext,
    ) => {
      return getAuctions(id, user);
    },
  },
  Mutation: {
    bid: async (
      _: any,
      { id }: { id: number; },
      { user }: ApolloContext,
    ) => {
      if (!user) {
        throw new Error('User not found');
      }

      // which auctions can be bid on?
      // * active ones
      // * not expired
      // * with bid+fee <= balance

      const auction = await Auction.findByPk(id, {
        include: lastBidPopulation,
      });      
      if (
        !isBalanceSufficientForBid(
          auction.bidFee,
          await getUserBalance(user.id),
        )
      )
        throw new Error('Insufficient funds');
      if (!auction || auction.status !== AuctionStatus.Active)
        throw new Error('Auction inactive');
      if (+new Date(auction.expiresAt) <= Date.now())
        throw new Error('Auction expired');

      const transaction = await sequelize.transaction();

      try {
        await Transaction.create(
          {
            userId: user.id,
            auctionId: auction.id,
            value: negative(auction.bidFee),
            type: TransactionType.Fee,
          },
          { transaction },
        );

        // better re-load from inside the transaction
        const lastAuctionBid = await AuctionBid.findOne({
          where: {
            auctionId: id
          },
          order: [['id', 'DESC']]
        });

        await AuctionBid.create(
          {
            auctionId: id,
            value: getMinRequiredBidForAuction(auction, lastAuctionBid),
            userId: user.id,
          },
          { transaction },
        );

        auction.expiresAt = new Date(
          +new Date(auction.expiresAt) + auctionTtlPerBid,
        );

        await auction.save({ transaction });
        if (+(await getUserBalance(user.id)) < 0) {
          // this means our cowboy somehow managed to become the fastest head on the west
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Ne tak bistro, pidor');
        }
        await transaction.commit();
      } catch (error) {
        console.error(error);
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await transaction.rollback();
        throw new Error('Count not create a bid');
      }

      const [updatedAuction] = await getAuctions(auction.id, user);
      pubsub.publish(AUCTION_BID_ADDED, { bidAdded: updatedAuction });
      await emitBalanceChanged(user.id);
      return updatedAuction;
    },
  },
  Subscription: {
    bidAdded: {
      subscribe: () => pubsub.asyncIterator([AUCTION_BID_ADDED]),
    },
  },
};
