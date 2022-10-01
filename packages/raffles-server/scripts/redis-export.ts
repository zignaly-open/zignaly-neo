import '../src/db';
import redisService from '../src/redisService';

(async () => {
  const args = process.argv.slice(2);
  const auctionId = parseInt(args[0]);
  await redisService.finalizeAuction(auctionId);
  console.log(`Auction ${auctionId} exported to db!`);
  process.exit();
})();
