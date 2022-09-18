import {
  AuctionType,
  AuctionBidType,
} from '@zignaly-open/raffles-shared/types';
import { random } from 'lodash';
import { sequelize } from '../../db';
import { Includeable, QueryTypes } from 'sequelize';
import { zignalySystemId } from '../../../config';
import { internalTransfer } from '../../cybavo';
import { ContextUser, TransactionType } from '../../types';
import { User } from '../users/model';
import { Auction, AuctionBid, AuctionBasketItem } from './model';
import {
  getMinRequiredBidForAuction,
  getPayoutPrizeForAuction,
  verifyPositiveBalance,
} from './util';

const AuctionsRepository = () => {
  const lastBidPopulation = {
    model: AuctionBid,
    as: 'bids',
    order: [['id', 'DESC']],
    limit: 1,
    include: [User],
  } as Includeable;

  function calculateNewExpiryDate(auction: Auction): Date {
    if (auction.expiresAt < auction.maxExpiryDate) {
      const expiryDate = +new Date(auction.expiresAt);
      const currentDate = Date.now();
      if (expiryDate - currentDate <= 10_000) {
        return new Date(expiryDate + random(5, 12) * 1_000);
      }
    }
  }

  async function createAuctionBid(
    user: ContextUser,
    auction: Auction,
    id: number,
  ): Promise<void> {
    if (auction.startDate > new Date()) {
      throw new Error('Auction is not active yet');
    }
    if (+new Date(auction.expiresAt) <= Date.now()) {
      throw new Error('Auction expired');
    }
    try {
      const txPromise = internalTransfer(
        user.publicAddress,
        zignalySystemId,
        auction.bidFee,
        TransactionType.Fee,
      ).then((tx) => {
        if (!tx.transaction_id) throw new Error('Transaction error');
        return tx;
      });

      // better re-load from inside the transaction
      const lastAuctionBidPromise = AuctionBid.findOne({
        where: {
          auctionId: id,
        },
        order: [['id', 'DESC']],
      });

      const [tx, lastAuctionBid] = await Promise.all([
        txPromise,
        lastAuctionBidPromise,
      ]);

      auction.expiresAt = calculateNewExpiryDate(auction);

      await AuctionBid.create({
        auctionId: id,
        transactionId: tx.transaction_id,
        value: getMinRequiredBidForAuction(auction, lastAuctionBid),
        userId: user.id,
      });

      await Promise.all([
        auction.save(),
        verifyPositiveBalance(user.publicAddress),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error('Could not create a bid');
    }
  }

  async function findAuction(user: ContextUser, id: number): Promise<Auction> {
    return await Auction.findByPk(id, {
      include: lastBidPopulation,
    }).then(async (auction) => {
      if (!auction) throw new Error('Auction not found');
      return auction;
    });
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
              SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY t."value" DESC) as "position" FROM ( 
                SELECT MAX(b.value) as value, MAX(b.id) as id, b."auctionId", b."userId", MAX(b."claimTransactionId") as "claimTransactionId", u."username" as "username"
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
              ${showAllBids ? 'OR true' : ''}
          ORDER BY filtered."id" DESC
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
      order: [['id', 'DESC']],
    })) as unknown as AuctionType[];

    auctions.forEach((a) => {
      // here we will match auctions and bids
      a.bids = bids.filter((b: AuctionBidType) => a.id === b.auctionId);
      a.userBid = a.bids.find((b) => b.user.id === user?.id);
      a.currentBid = getPayoutPrizeForAuction(a, a.bids[0]);
    });

    return auctions;
  }

  return {
    getAuctions,
    getSortedAuctionBids,
    findAuction,
    createAuctionBid,
    calculateNewExpiryDate,
    lastBidPopulation,
  };
};

export default AuctionsRepository();
