import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

const processBalance = async (balance: string, id: number): Promise<string> => {
  // try {
  const res = (await redis.fcall(
    'update_balance',
    2,
    `USER_CYBAVO_BALANCE`,
    `USER_CURRENT_BALANCE`,
    id,
    Math.floor(+balance * 100),
  )) as string;
  return (+res / 100).toString();
  // } catch (e) {
  //   console.error(e);
  // }
};

export default {
  processBalance,
};
