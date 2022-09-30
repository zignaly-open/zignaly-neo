import Redis from 'ioredis';
import { Auction } from './entities/auctions/model';
import { RedisAuctionData } from './types';
const redis = new Redis(process.env.REDIS_URL);

const GWEI_UNIT = 10 ** 3;

const strToUnit = (value: string) => Math.floor(parseFloat(value) * GWEI_UNIT);
const unitToStr = (value: string, decimals = 2) =>
  (parseFloat(value) / GWEI_UNIT).toFixed(decimals);

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
  try {
    const res = (await redis.fcall(
      'bid',
      3,
      `USER_CURRENT_BALANCE`,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
      userId,
      auctionId,
    )) as any;

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
  } catch (e) {
    console.error(e);
    throw new Error('Could not bid');
  }
};

const getAuctionData = async (auctionId: number): Promise<RedisAuctionData> => {
  try {
    const [expire, price, ranking] = (await redis.fcall(
      'get_auction_data',
      2,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
    )) as any;
    return {
      expire: new Date(Math.round(expire / 1000)),
      price: unitToStr(price),
      // price,
      ranking: ranking.reverse(),
    };
  } catch (e) {
    console.error(e);
    throw new Error('Could not get auction data');
  }
};

const getAuctionRanking = async (auctionId: number) => {
  return redis.zrange(`AUCTION_LEADERBOARD:${auctionId}`, 0, -1);
};

export default {
  redis,
  processBalance,
  bid,
  prepareAuction,
  getAuctionData,
  getAuctionRanking,
};
