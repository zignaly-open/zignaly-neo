import Redis from 'ioredis';
import { Auction } from './entities/auctions/model';
import { RedisAuctionData, RedisBidAuctionData } from './types';
const redis = new Redis(process.env.REDIS_URL);

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
    parseFloat(auction.bidStep) * 100,
    'bidFee',
    parseFloat(auction.bidFee) * 100,
    'price',
    parseFloat(auction.currentBid) * 100,
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
      Math.floor(+balance * 100),
      // Math.trunc(+balance * 100) / 100,
    )) as string;
    return res;
  } catch (e) {
    console.error(e);
    throw new Error('Could not update balance');
  }
};

const bid = async (
  userId: number,
  auctionId: number,
): Promise<RedisBidAuctionData> => {
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
    const [expire, price, ranking, balance] = res;
    return {
      ...formatAuctionData({ expire, price, ranking }),
      balance: balance,
    };
  } catch (e) {
    console.error(e);
    throw new Error('Could not bid');
  }
};

const formatAuctionData = (data: any): RedisAuctionData => ({
  expire: new Date(Math.round(data.expire / 1000)),
  price: (+data.price / 100).toString(),
  // price,
  ranking: data.ranking.reverse(),
});

const getAuctionData = async (auctionId: number): Promise<RedisAuctionData> => {
  try {
    const [expire, price, ranking] = (await redis.fcall(
      'get_auction_data',
      2,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
    )) as any;
    return formatAuctionData({ expire, price, ranking });
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
