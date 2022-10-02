import Redis from 'ioredis';
import { isTest, redisURL } from '../config';
import { AUCTION_UPDATED } from './entities/auctions/constants';
import AuctionsRepository from './entities/auctions/repository';
import { Auction, AuctionBid } from './entities/auctions/model';
import pubsub from './pubsub';
import { RedisAuctionData } from './types';

const redis = new Redis(redisURL);
const BASE_UNIT = 10 ** 3;
const strToUnit = (value: string) => Math.floor(parseFloat(value) * BASE_UNIT);
const unitToStr = (value: string, decimals = 2) =>
  (parseFloat(value) / BASE_UNIT).toFixed(decimals);

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
  } else if (res === -3) {
    throw new Error('Auction not found');
  } else if (res === -4) {
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
    // Ignore error from running test when debounced subscriptions publish event after finished.
    if (!isTest || e.message !== 'Connection is closed.') {
      console.error(e);
    }
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

const finalizeAuction = async (auctionId: number) => {
  const { price, expire, ranking } = await getAuctionData(auctionId);
  await Auction.update(
    { inRedis: false, isFinalized: true, currentBid: price, expireAt: expire },
    { where: { id: auctionId } },
  );
  await AuctionBid.bulkCreate(
    ranking.map((r, i) => ({
      userId: +r,
      position: i + 1,
      auctionId,
    })),
  );

  const [auctionUpdated] = await AuctionsRepository.getAuctionsWithBids(
    auctionId,
  );
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
