import {
  AuctionType,
  AuctionBidType,
} from '@zignaly-open/raffles-shared/types';
import axios from 'axios';
import { random } from 'lodash';
import { sequelize } from '../../db';
import { Includeable, QueryTypes } from 'sequelize';
import { zignalySystemId, payoutSpreadsheetUrl, isTest } from '../../../config';
import { internalTransfer } from '../../cybavo';
import { ContextUser, TransactionType } from '../../types';
import { Payout } from '../payouts/model';
import { User } from '../users/model';
import { AUCTION_FEE } from './constants';
import { Auction, AuctionBid, AuctionBasketItem } from './model';
import { getMinRequiredBidForAuction, verifyPositiveBalance } from './util';

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
      if (expiryDate - currentDate >= 3600_000 * 10) {
        return new Date(expiryDate + 60 * random(1, 4) * 60_000);
      } else if (expiryDate - currentDate > 60_000 * 10) {
        return new Date(expiryDate + 10 * random(1, 4) * 60_000);
      } else {
        return new Date(expiryDate + random(5, 11) * 60_000);
      }
    }
  }

  async function createAuctionBid(
    user: ContextUser,
    auction: Auction,
    id: number,
  ): Promise<void> {
    try {
      if (+new Date(auction.expiresAt) <= Date.now()) {
        throw new Error('Auction expired');
      }

      const txPromise = internalTransfer(
        user.publicAddress,
        zignalySystemId,
        AUCTION_FEE,
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

      auction.expiresAt = this.calculateNewExpiryDate(auction);

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
                      SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY T."value" DESC) as "position" FROM ( 
                        SELECT MAX(b.value) as value, MAX(b.id) as id, b."auctionId", b."userId", MAX(b."claimTransactionId") as "claimTransactionId", u."username" as "username"
                        FROM "${AuctionBid.tableName}" b
                        INNER JOIN "${User.tableName}" u ON b."userId" = u."id"
                        WHERE "auctionId" ${id ? '=' : '>'} $auctionId
                        GROUP BY "auctionId", "userId", "username"
                     ) t
                  ) filtered
                  INNER JOIN "${
                    Auction.tableName
                  }" a ON a."id" = filtered."auctionId"
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
    const bids = await this.getSortedAuctionBids(id, showAllBids, user);
    const auctions = (await Auction.findAll({
      where: { ...(id ? { id } : {}) },
      include: [AuctionBasketItem],
    })) as unknown as AuctionType[];

    auctions.forEach((x) => {
      // here we will match auctions and bids
      x.bids = bids.filter((b: AuctionBidType) => x.id === b.auctionId);
      x.userBid = x.bids.find((b) => b.user.id === user?.id);
      x.minimalBid = getMinRequiredBidForAuction(x, x.bids[0]);
    });

    return auctions;
  }

  async function performPayout(payout: Payout): Promise<void> {
    const { discordName, username } = await User.findByPk(payout.userId);
    const payload = {
      discordName,
      username,
      publicAddress: payout.publicAddress,
      id: payout.userId,
    };
    if (isTest) return;
    // TODO: implement error handling. There should be some enum for possible error/success states
    await axios
      .post(payoutSpreadsheetUrl, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        throw e;
      });
  }

  return {
    performPayout,
    getAuctions,
    getSortedAuctionBids,
    findAuction,
    createAuctionBid,
    calculateNewExpiryDate,
    lastBidPopulation,
  };
};

export default AuctionsRepository();
