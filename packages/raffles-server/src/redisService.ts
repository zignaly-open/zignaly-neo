import Redis from 'ioredis';
import { Auction } from './entities/auctions/model';
import { RedisAuctionData } from './types';
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
    auction.bidStep,
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
    )) as string;
    return (+res / 100).toString();
  } catch (e) {
    console.error(e);
    throw new Error('Could not update balance');
  }
};

const bid = async (userId: number, auctionId: number): Promise<void> => {
  let res = 0;

  try {
    res = (await redis.fcall(
      'bid',
      3,
      `USER_CURRENT_BALANCE`,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
      userId,
      auctionId,
    )) as number;
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
};

const getAuctionData = async (auctionId: number): Promise<RedisAuctionData> => {
  try {
    const [expire, price, ranking] = (await redis.fcall(
      'get_auction_data',
      2,
      `AUCTION:${auctionId}`,
      `AUCTION_LEADERBOARD:${auctionId}`,
      auctionId,
    )) as any;
    return {
      expire: new Date(Math.round(expire / 1000)),
      price: (+price / 100).toString(),
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
