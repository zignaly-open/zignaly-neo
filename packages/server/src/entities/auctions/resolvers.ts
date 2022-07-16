import {
  AuctionType,
  AuctionBidType,
} from '@zigraffle/shared/types';
import pubsub from '../../pubsub';
import {AUCTION_BID_ADDED} from './constants';
import {Auction, AuctionBasketItem, AuctionBid} from './model';
import {Includeable, QueryTypes} from 'sequelize';
import {ApolloContext, ContextUser} from '../../types';
import {User} from '../users/model';
import {sequelize} from '../../db';
import {Transaction, TransactionType} from '../transactions/model';
import {
  emitBalanceChanged,
  getUserBalance,
  negative,
} from '../transactions/util';
import {getMinRequiredBidForAuction, isBalanceSufficientForBid} from './util';
import {random} from 'lodash';

const lastBidPopulation = {
  model: AuctionBid,
  as: 'bids',
  order: [['id', 'DESC']],
  limit: 1,
  include: [User],
} as Includeable;

async function calculateNewExpiryDate({auction}: any) {
  if (auction.expiresAt < auction.maxExpiryDate) {
    if (auction.expiresAt.getSeconds() > 36000) {
      auction.expiresAt = new Date(
        +new Date(auction.expiresAt) + 60 * random(1, 4) * 60_000,
      );
    } else if (
      auction.expiresAt.getSeconds() < 36000 &&
      auction.expiresAt.getSeconds() > 600
    ) {
      auction.expiresAt = new Date(
        +new Date(auction.expiresAt) + 10 * random(1, 4) * 60_000,
      );
    } else {
      auction.expiresAt = new Date(
        +new Date(auction.expiresAt) + random(5, 11) * 60_000,
      );
    }
  }
}

async function getSortedAuctionBids(
  id: number,
  showAllBids: boolean,
  user: ContextUser,
) {
  return (
    await sequelize.query(
      `
        SELECT filtered.* FROM (
            SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY T."value" DESC) as "position" FROM ( 
              SELECT MAX(b.value) as value, MAX(b.id) as id, b."auctionId", b."userId", u."username" as "username"
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
        bind: {auctionId: id || 0, currentUserId: user?.id || 0},
      },
    )
  ).map(
    (b: {
      id: number;
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
    where: {...(id ? {id} : {})},
    include: [AuctionBasketItem],
    raw: true,
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
      {id}: { id: number },
      {user}: ApolloContext,
    ) => {
      return getAuctions(id, user);
    },
  },
  Mutation: {
    bid: async (_: any, {id}: { id: number }, {user}: ApolloContext) => {
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
      if (!auction) throw new Error('Auction not found');
      if (+new Date(auction.expiresAt) <= Date.now())
        throw new Error('Auction expired');
      if (
        !isBalanceSufficientForBid(
          auction.bidFee,
          await getUserBalance(user.id),
        )
      )
        throw new Error('Insufficient funds');

      const transaction = await sequelize.transaction();

      try {
        await Transaction.create(
          {
            userId: user.id,
            auctionId: auction.id,
            value: negative(auction.bidFee),
            type: TransactionType.Fee,
          },
          {transaction},
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
            value: getMinRequiredBidForAuction(auction, lastAuctionBid),
            userId: user.id,
          },
          {transaction},
        );

        calculateNewExpiryDate({auction: auction});

        await auction.save({transaction});
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
      pubsub.publish(AUCTION_BID_ADDED, {bidAdded: updatedAuction});
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
