import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

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
  try {
    const res = (await redis.fcall(
      'bid',
      3,
      `USER_CURRENT_BALANCE`,
      'AUCTION:' + auctionId,
      'AUCTION_LEADERBOARD:' + auctionId,
      userId,
      auctionId,
    )) as boolean;
    if (!res) {
      throw new Error('Auction expired');
    }
  } catch (e) {
    console.error(e);
    throw new Error('Could not bid');
  }
};

export default {
  processBalance,
  bid,
};
