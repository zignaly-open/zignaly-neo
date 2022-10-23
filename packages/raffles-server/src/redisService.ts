import Redis from 'ioredis';
import { isTest, redisURL, zignalySystemId } from '../config';
import { AUCTION_UPDATED } from './entities/auctions/constants';
import AuctionsService from './entities/auctions/service';
import { Auction, AuctionBid } from './entities/auctions/model';
import pubsub from './pubsub';
import { RedisAuctionData, TransactionType } from './types';
import { getUserBalance, internalTransfer } from './cybavo';
import { User } from './entities/users/model';
import { mapLimit } from 'modern-async';
import BN from 'bignumber.js';
import fs from 'fs';
import path from 'path';

const redis = new Redis(redisURL, {
  ...(isTest && {
    retryStrategy() {
      return null;
    },
  }),
});
// Load lua functions
const content = fs.readFileSync(path.resolve(__dirname, 'functions.lua'));
redis.function('LOAD', 'REPLACE', content);

const BASE_UNIT = 10 ** 3;
const strToUnit = (value: string) => Math.floor(parseFloat(value) * BASE_UNIT);
const unitToStr = (value: string, decimals = 2) =>
  (parseFloat(value) / BASE_UNIT).toFixed(decimals);
const unitToBN = (value: string) => new BN(parseFloat(value) / BASE_UNIT);

const prepareAuction = async (auction: Auction) => {
  return redis.hset(
    `AUCTION:${auction.id}`,
    'start',
    +auction.startDate * 1000,
    'expire',
    +auction.expiresAt * 1000,
    'maxExpire',
    +auction.maxExpiryDate * 1000,
    'bidStep',
    strToUnit(auction.bidStep),
    'bidFee',
    strToUnit(auction.bidFee),
    'price',
    strToUnit(auction.currentBid),
  );
};

const processBalance = async (
  balance: string,
  userId: number,
): Promise<string> => {
  try {
    const res = (await redis.fcall(
      'update_balance',
      2,
      `USER_CYBAVO_BALANCE`,
      `USER_CURRENT_BALANCE`,
      userId,
      strToUnit(balance),
      // Math.trunc(+balance * 100) / 100,
    )) as string;
    return unitToStr(res);
  } catch (e) {
    console.error(e);
    throw new Error('Could not update balance');
  }
};

const bid = async (userId: number, auctionId: number): Promise<string> => {
  let res;
  try {
    res = (await redis.fcall(
      'bid',
      3,
      `USER_CURRENT_BALANCE`,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
      userId,
      auctionId,
    )) as any;
  } catch (e) {
    console.error(e);
    throw new Error('Could not bid');
  }

  if (res === -1) {
    throw new Error('Balance not found');
  } else if (res === -2) {
    throw new Error('Insufficient balance');
    // } else if (res === -3) {
    // throw new Error('Auction not found');
  } else if (res === -3 || res === -4) {
    throw new Error('Auction expired');
  } else if (res === -5) {
    throw new Error('Auction is not active yet');
  } else if (!res || res < 0) {
    throw new Error('Unknown error');
  }
  return unitToStr(res);
};

const getAuctionData = async (auctionId: number): Promise<RedisAuctionData> => {
  try {
    const [expire, price, ranking] = (await redis.fcall(
      'get_auction_data',
      2,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
    )) as any;

    if (!price || !expire) {
      throw new Error('Redis auction not found');
    }

    return {
      expire: new Date(Math.round(expire / 1000)),
      price: unitToStr(price),
      ranking: ranking ? ranking.reverse() : [],
    };
  } catch (e) {
    console.error(e);
    throw new Error('Could not get auction data');
  }
};

const getAuctionRanking = async (auctionId: number) => {
  return redis.zrange(`AUCTION_LEADERBOARD:${auctionId}`, 0, -1);
};

const getAuctionExpiration = async (auctionId: number) => {
  const value = await redis.hget(`AUCTION:${auctionId}`, 'expire');
  return +value;
};

const makeTransfer = async (auctionId: number, user: User) => {
  const [cybavoBalance, currentBalance] = await Promise.all([
    unitToBN(await redis.hget('USER_CYBAVO_BALANCE', user.id.toString())),
    unitToBN(await redis.hget('USER_CURRENT_BALANCE', user.id.toString())),
  ]);

  // Shouldn't be possible
  if (currentBalance.gte(cybavoBalance)) return;

  const amount = cybavoBalance.minus(
    // No reason why current balance would be less than cybavo but just in case
    cybavoBalance.lt(currentBalance) ? cybavoBalance : currentBalance,
  );

  const tx = await internalTransfer(
    user.publicAddress,
    zignalySystemId,
    amount.toString(),
    TransactionType.Fee,
    false,
  );
  if (!tx.transaction_id) {
    throw new Error('Transaction error');
  }
  // Set balance
  const balance = await getUserBalance(user.publicAddress);
  await Promise.all([
    redis.hset('USER_CYBAVO_BALANCE', user.id.toString(), strToUnit(balance)),
    redis.hset('USER_CURRENT_BALANCE', user.id.toString(), strToUnit(balance)),
  ]);
  return tx.transaction_id;
};

const finalizeAuction = async (auctionId: number) => {
  const auction = await Auction.findByPk(auctionId);
  const { price, expire, ranking } = await getAuctionData(auctionId);
  const usersData = await User.findAll({ where: { id: ranking } });

  let transfersSuccess = 0;

  const bids = await mapLimit(
    ranking,
    async (userId, i) => {
      const user = usersData.find((u) => u.id === +userId);
      let txId: string;
      try {
        txId = await makeTransfer(auctionId, user);
        if (!txId) {
          throw new Error('No transfer to do!');
        }
        transfersSuccess++;
      } catch (e) {
        console.error(`Transaction error for user ${user.id}`, e);
      }

      const position = i + 1;

      return {
        userId,
        position,
        auctionId,
        isWinner: position <= auction.numberOfWinners,
        transactionId: txId,
      };
    },
    25,
  );

  if (!isTest) {
    console.log(`${transfersSuccess}/${usersData.length} transfers success`);
  }

  await AuctionBid.bulkCreate(bids);

  await Auction.update(
    {
      inRedis: false,
      isFinalized: true,
      currentBid: price,
      expiresAt: expire,
    },
    { where: { id: auctionId } },
  );

  await redis.del(`AUCTION:${auctionId}`);
  await redis.del(`AUCTION_LEADERBOARD:${auctionId}`);

  const [auctionUpdated] = await AuctionsService.getAuctionsWithBids(auctionId);
  pubsub.publish(AUCTION_UPDATED, {
    auctionUpdated,
  });
};

export default {
  redis,
  processBalance,
  bid,
  prepareAuction,
  getAuctionData,
  getAuctionRanking,
  getAuctionExpiration,
  finalizeAuction,
};
