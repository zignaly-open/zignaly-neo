import {
  AuctionType,
  AuctionBidType,
} from '@zignaly-open/raffles-shared/types';
import { random } from 'lodash';
import { sequelize } from '../../db';
import { Includeable, QueryTypes } from 'sequelize';
import { ContextUser, TransactionType } from '../../types';
import { User } from '../users/model';
import { Auction, AuctionBid } from './model';
import { getMinRequiredBidForAuction } from './util';
import { internalTransfer } from '../../cybavo';
import { isTest, zignalySystemId } from '../../../config';
import redisService from '../../redisService';

const AuctionsRepository = () => {
  const lastBidPopulation = {
    model: AuctionBid,
    as: 'bids',
    order: [['id', 'DESC']],
    limit: 1,
    include: [User],
  } as Includeable;

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
      const tx = await internalTransfer(
        user.publicAddress,
        zignalySystemId,
        auction.bidFee,
        TransactionType.Fee,
      );
      if (!tx.transaction_id) throw new Error('Transaction error');

      await Promise.all([
        AuctionBid.create({
          auctionId: id,
          transactionId: tx.transaction_id,
          value: getMinRequiredBidForAuction(auction),
          userId: user.id,
        }),
        incrementBidPrice(auction.id),
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

  async function findUsers(ids: number[]): Promise<User[]> {
    return await User.findAll({ where: { id: ids } });
  }

  async function getSortedAuctionBids(
    id: number,
    showAllBids?: boolean,
    user?: ContextUser,
  ) {
    // todo: use data migrated from redis
    return (
      await sequelize.query(
        `
          SELECT filtered.* FROM (
              SELECT *, ROW_NUMBER () OVER (PARTITION BY t."auctionId" ORDER BY t."id" DESC) as "position" FROM ( 
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

  async function incrementBidPrice(auctionId: number) {
    const rdm = random(5, 12);
    const maxSecs = 10;

    return await sequelize.query(`
      UPDATE "${Auction.tableName}"
      SET "currentBid" = "currentBid" + "bidStep",
          "expiresAt" = 
              CASE
              WHEN "expiresAt" < "maxExpiryDate"
              ${
                !isTest
                  ? `AND "expiresAt" - NOW() <= interval '${maxSecs} seconds'
                  THEN "expiresAt" + (${rdm} * interval '1 seconds')`
                  : //sqlite syntax for tests
                    `AND (JULIANDAY("expiresAt") - JULIANDAY(CURRENT_TIMESTAMP)) * 86400.0 <= ${maxSecs}
                  THEN DATETIME(expiresAt, '+${rdm} seconds')`
              }
              ELSE "expiresAt"
              END
      WHERE id = ${auctionId}
  `);
  }

  async function getAuctions(
    id: number,
    user: ContextUser,
    showAllBids?: boolean,
  ) {
    const bids = await getSortedAuctionBids(id, showAllBids, user);
    const auctions = (await Auction.findAll({
      where: { ...(id ? { id } : {}) },
      order: [['id', 'DESC']],
    })) as unknown as AuctionType[];

    for await (const a of auctions) {
      // here we will match auctions and bids
      a.bids = bids.filter((b: AuctionBidType) => a.id === b.auctionId);
      // a.userBid = a.bids.find((b) => b.user.id === user?.id);
      if (a.inRedis) {
        const redisData = await redisService.getAuctionData(a.id);
        a.currentBid = redisData.price;
        a.expiresAt = redisData.expire;
        // todo: improve perfs
        const users = await findUsers(redisData.ranking);
        a.bids = redisData.ranking.map((r, i) => ({
          id: 1,
          position: i + 1,
          user: { id: r, username: users.find((u) => u.id === +r)?.username },
        }));
      }
    }

    return auctions;
  }

  return {
    getAuctions,
    getSortedAuctionBids,
    findAuction,
    createAuctionBid,
    lastBidPopulation,
    findUsers,
  };
};

export default AuctionsRepository();
