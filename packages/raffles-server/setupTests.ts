import { RedisMemoryServer } from 'redis-memory-server';

let redisServer: RedisMemoryServer;

module.exports = async () => {
  redisServer = new RedisMemoryServer({
    instance: {
      args: ['--dbfilename', 'rdb'],
    },
  });
  const host = await redisServer.getHost();
  const port = await redisServer.getPort();
  process.env.REDIS_URL = `redis://${host}:${port}`;
};
