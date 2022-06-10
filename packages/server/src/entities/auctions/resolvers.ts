import { AuctionStatus } from '@zigraffle/shared/types';
import pubsub from '../../pubsub';
import { AUCTION_BID_ADDED } from './constants';
import { Auction, AuctionBasketItem, AuctionBid } from './model';
import { Includeable } from 'sequelize';
import { ApolloContext, ContextUser } from '../../types';
import { auctionTtlPerBid } from '../../../config';
import { User } from '../users/model';

async function getAuctions(id: number, user: ContextUser) {
  const lastBidPopulation = {
    model: AuctionBid,
    as: 'bids',
    order: [['id', 'DESC']],
    limit: 1,
    include: [User],
  } as Includeable;

  const lastUsersBidPopulation = {
    model: AuctionBid,
    order: [['id', 'DESC']],
    limit: 1,
    as: 'userBid',
    where: { userId: user?.id },
  } as Includeable;

  return await Auction.findAll({
    where: { ...(id ? { id } : {}) },
    include: [AuctionBasketItem, lastBidPopulation].concat(
      user ? lastUsersBidPopulation : [],
    ),
  });
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
      { id, bid }: { id: number; bid: number },
      { user }: ApolloContext,
    ) => {
      if (!user) {
        throw new Error('User not found');
      }

      const auction = await Auction.findByPk(id);
      if (!auction || auction.status !== AuctionStatus.Active) return null;

      const maxBid = await AuctionBid.findOne({
        where: { auctionId: id },
        order: [['value', 'DESC']],
      });

      if (bid <= (maxBid ? +maxBid.value : +auction.startingBid)) {
        throw new Error('A greater bid exists');
      }

      await AuctionBid.create({
        auctionId: id,
        value: bid,
        userId: user.id,
      });

      auction.expiresAt = new Date(
        +new Date(auction.expiresAt) + auctionTtlPerBid,
      );
      await auction.save();

      const [updatedAuction] = await getAuctions(auction.id, user);
      pubsub.publish(AUCTION_BID_ADDED, { bidAdded: updatedAuction });
      return updatedAuction;
    },
  },
  Subscription: {
    bidAdded: {
      subscribe: () => pubsub.asyncIterator([AUCTION_BID_ADDED]),
    },
  },
};
