afterAll(async () => {
  if (global.redisServer) {
    await global.redisServer.stop();
  }
});
