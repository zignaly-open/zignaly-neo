module.exports = {
  redisMemoryServerOptions: {
    instance: {
      // port: number, // by default, choose any free port
      // ip: string, // by default, '127.0.0.1'; for binding to all IP addresses set it to `::,0.0.0.0`,
      args: ['--dbfilename', 'rdb'], // by default, no additional arguments; any additional command line arguments for `redis-server`
    },
    // binary: {
    //   version: string, // by default, 'stable'
    //   downloadDir: string, // by default, 'node_modules/.cache/redis-memory-server/redis-binaries'
    //   systemBinary: string, // by default, undefined
    // },
    // autoStart: boolean, // by default, true
  },
  // useSharedDBForAllJestWorkers: boolean, // enables seperated database for each test worker. This disables the exported environment variable.
  // redisURLEnvName: string, // the exported environment variable name
};
