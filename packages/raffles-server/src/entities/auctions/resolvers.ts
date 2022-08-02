import { AuctionType, AuctionBidType } from '@zignaly/raffles-shared/types';
import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { Auction, AuctionBasketItem, AuctionBid } from './model';
import { Includeable, QueryTypes } from 'sequelize';
import { ApolloContext, ContextUser } from '../../types';
import { User } from '../users/model';
import { sequelize } from '../../db';
import { emitBalanceChanged, getUserBalance } from '../transactions/util';
import {
  getMinRequiredBidForAuction,
  isBalanceSufficientForPayment,
  verifyPositiveBalance,
} from './util';
import { Payout } from '../payouts/model';
import performPayout from './functions/performPayout';
import calculateNewExpiryDate from './functions/calculateExpiryDate';
import { internalTransfer, TransactionType } from '../../cybavo';
import { zignalySystemId } from '../../../config';

const lastBidPopulation = {
  model: AuctionBid,
  as: 'bids',
  order: [['id', 'DESC']],
  limit: 1,
  include: [User],
} as Includeable;

async function getSortedAuctionBids(
  id: number,
  showAllBids?: boolean,
  user?: ContextUser,
) {
  return (
    await sequelize.query(
      `
        SELECT filtered.* FROM (
            SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY T."value" DESC) as "position" FROM ( 
              SELECT MAX(b.value) as value, MAX(b.id) as id, b."auctionId", b."userId", MAX(b."claimTransactionId") as claimTransactionId, u."username" as "username"
              FROM "${AuctionBid.tableName}" b
              INNER JOIN "${User.tableName}" u ON b."userId" = u."id"
              WHERE "auctionId" ${id ? '=' : '>'} $auctionId
              GROUP BY "auctionId", "userId", "username"
           ) t
        ) filtered
        INNER JOIN "${Auction.tableName}" a ON a."id" = filtered."auctionId"
        WHERE 
            "position" <= a."numberOfWinners" 
            OR "userId" = $currentUserId 
            ${showAllBids ? 'OR 1' : ''}
  `,
      {
        type: QueryTypes.SELECT,
        bind: { auctionId: id || 0, currentUserId: user?.id || 0 },
      },
    )
  ).map(
    (b: {
      id: number;
      claimTransactionId: number;
      position: number;
      username: string;
      userId: number;
      value: string;
      auctionId: number;
    }) =>
      ({
        position: b.position,
        id: b.id,
        auctionId: b.auctionId,
        isClaimed: !!b.claimTransactionId,
        value: b.value,
        user: {
          id: b.userId,
          username: b.username,
        },
      } as AuctionBidType),
  );
}

async function getAuctions(
  id: number,
  user: ContextUser,
  showAllBids?: boolean,
) {
  const bids = await getSortedAuctionBids(id, showAllBids, user);
  const auctions = (await Auction.findAll({
    where: { ...(id ? { id } : {}) },
    include: [AuctionBasketItem],
  })) as unknown as AuctionType[];

  auctions.forEach((x) => {
    // here we will match auctions and bids
    x.bids = bids.filter((b) => x.id === b.auctionId);
    x.userBid = x.bids.find((b) => b.user.id === user?.id);
    x.minimalBid = getMinRequiredBidForAuction(x, x.bids[0]);
  });

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
    bid: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }

      const auction = await Auction.findByPk(id, {
        include: lastBidPopulation,
      });
      if (!auction) throw new Error('Auction not found');
      if (+new Date(auction.expiresAt) <= Date.now())
        throw new Error('Auction expired');
      if (
        !isBalanceSufficientForPayment(
          auction.bidFee,
          await getUserBalance(user.id),
        )
      )
        throw new Error('Insufficient funds');

      try {
        const tx = await internalTransfer(
          user.publicAddress,
          zignalySystemId,
          '1',
          TransactionType.Fee,
        );

        // better re-load from inside the transaction
        const lastAuctionBid = await AuctionBid.findOne({
          where: {
            auctionId: id,
          },
          order: [['id', 'DESC']],
        });

        await AuctionBid.create({
          auctionId: id,
          transactionId: tx.transaction_id,
          value: getMinRequiredBidForAuction(auction, lastAuctionBid),
          userId: user.id,
        });

        auction.expiresAt = calculateNewExpiryDate(auction);

        await verifyPositiveBalance(user.id);
      } catch (error) {
        console.error(error);
        throw new Error('Count not create a bid');
      }

      const [updatedAuction] = await getAuctions(auction.id, user);
      pubsub.publish(AUCTION_UPDATED, { auctionUpdated: updatedAuction });
      await emitBalanceChanged(user);
      return updatedAuction;
    },

    claim: async (_: any, { id }: { id: number }, { user }: ApolloContext) => {
      if (!user) {
        throw new Error('User not found');
      }
      const auction = await Auction.findByPk(id, {
        include: lastBidPopulation,
      });
      if (!auction) throw new Error('Auction not found');
      if (+new Date(auction.expiresAt) > Date.now())
        throw new Error('Auction not expired yet');
      if (auction.maxClaimDate && +new Date(auction.maxClaimDate) < Date.now())
        throw new Error('Can not claim after the max claim date');

      // here we SPECIFICALLY do not pass the current user to not receive current user's bid
      // TODO: maybe we should refactor it to make this more explicit
      const winningBids = await getSortedAuctionBids(id, false, undefined);
      const winningBidId = winningBids.find(
        (bid) => bid.user.id === user.id,
      )?.id;
      if (!winningBidId) throw new Error('Can not find the bid');
      const winningBid = await AuctionBid.findByPk(winningBidId);

      if (winningBid.claimTransactionId) {
        // cheeky bastard
        throw new Error('Already claimed');
      }

      if (
        !isBalanceSufficientForPayment(
          winningBid.value,
          await getUserBalance(user.id),
        )
      )
        throw new Error('Insufficient funds');

      try {
        const tx = await internalTransfer(
          user.publicAddress,
          zignalySystemId,
          winningBid.value,
          TransactionType.Payout,
        );

        winningBid.claimTransactionId = tx.transaction_id;
        await winningBid.save();
        await verifyPositiveBalance(user.id);
      } catch (error) {
        console.error(error);
        throw new Error('Count not make a claim');
      }

      const payout = await Payout.create({
        auctionId: id,
        userId: user.id,
        publicAddress: user.publicAddress,
      });

      await performPayout(payout);

      const [updatedAuction] = await getAuctions(auction.id, user);
      // no need to emit updated auctions here
      await emitBalanceChanged(user);
      return updatedAuction;
    },
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
