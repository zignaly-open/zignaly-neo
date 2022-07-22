import { AuctionType, AuctionBidType } from '@zigraffle/shared/types';
import pubsub from '../../pubsub';
import { AUCTION_UPDATED } from './constants';
import { Auction, AuctionBasketItem, AuctionBid } from './model';
import { Includeable, QueryTypes } from 'sequelize';
import { ApolloContext, ContextUser } from '../../types';
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
  isBalanceSufficientForPayment,
  verifyPositiveBalance,
} from './util';
import { random } from 'lodash';
import { performPayout } from '../../chain/payout';
import { Payout } from '../payouts/model';

const lastBidPopulation = {
  model: AuctionBid,
  as: 'bids',
  order: [['id', 'DESC']],
  limit: 1,
  include: [User],
} as Includeable;

function calculateNewExpiryDate(auction: Auction) {
  if (auction.expiresAt < auction.maxExpiryDate) {
    const expiryDate = +new Date(auction.expiresAt);
    const currentDate = Date.now();
    if (expiryDate - currentDate >= 3600_000 * 10) {
      return new Date(expiryDate + 60 * random(1, 4) * 60_000);
    } else if (expiryDate - currentDate > 60_000 * 10) {
      return new Date(expiryDate + 10 * random(1, 4) * 60_000);
    } else {
      return new Date(expiryDate + random(5, 11) * 60_000);
    }
  }
}

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

      const transaction = await sequelize.transaction();

      try {
        const bidFeeTransaction = await Transaction.create(
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
            auctionId: id,
          },
          order: [['id', 'DESC']],
        });

        await AuctionBid.create(
          {
            auctionId: id,
            transactionId: bidFeeTransaction.id,
            value: getMinRequiredBidForAuction(auction, lastAuctionBid),
            userId: user.id,
          },
          { transaction },
        );

        auction.expiresAt = calculateNewExpiryDate(auction);

        await auction.save({ transaction });
        await verifyPositiveBalance(user.id);
        await transaction.commit();
      } catch (error) {
        console.error(error);
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await transaction.rollback();
        throw new Error('Count not create a bid');
      }

      const [updatedAuction] = await getAuctions(auction.id, user);
      pubsub.publish(AUCTION_UPDATED, { auctionUpdated: updatedAuction });
      await emitBalanceChanged(user.id);
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

      const transaction = await sequelize.transaction();

      try {
        const paymentTransaction = await Transaction.create(
          {
            userId: user.id,
            auctionId: auction.id,
            value: negative(winningBid.value),
            type: TransactionType.Bid,
          },

          { transaction },
        );

        winningBid.claimTransactionId = paymentTransaction.id;
        await winningBid.save({ transaction });
        await verifyPositiveBalance(user.id);
        await transaction.commit();
      } catch (error) {
        console.error(error);
        // If the execution reaches this line, an error was thrown.
        // We rollback the transaction.
        await transaction.rollback();
        throw new Error('Count not make a claim');
      }

      const payout = await Payout.create({
        auctionId: id,
        userId: user.id,
        woWallet: user.publicAddress,
      });

      // note that we should not await for the result of this because it can take some time
      performPayout(payout).then((txId) => {
        payout.txId = txId;
        payout.save();
      });

      const [updatedAuction] = await getAuctions(auction.id, user);
      // no need to emit updated auctions here
      await emitBalanceChanged(user.id);
      return updatedAuction;
    },
  },
  Subscription: {
    auctionUpdated: {
      subscribe: () => pubsub.asyncIterator([AUCTION_UPDATED]),
    },
  },
};
