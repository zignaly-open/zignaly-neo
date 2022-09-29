// import RedisMock from 'ioredis-mock';

// jest.mock('ioredis', () => require('ioredis-mock'));
// eslint-disable-next-line
// @ts-ignore
// class RedisMockExt extends RedisMock {
//   // eslint-disable-next-line
//   // @ts-ignore
//   constructor(...args) {
//     super(args);
//   }

//   fcall() {
//     console.log('aa');
//     throw new Error('Test error');
//   }
// }
// jest.mock('ioredis', () => RedisMockExt);

// import { RedisMemoryServer } from 'redis-memory-server';
// import Redis from 'ioredis';

// let redis: Redis;
// let redisServer: RedisMemoryServer;

// module.exports = async () => {
//   redisServer = new RedisMemoryServer({
//     instance: {
//       args: [
//         '--dir',
//         '/Users/chris/Dev/zigraffle/packages/raffles-server',
//         '--dbfilename',
//         'functions.lua',
//       ],
//     },
//   });

//   const host = await redisServer.getHost();
//   const port = await redisServer.getPort();
//   return new Redis({
//     host,
//     port,
//   });
// };
