import '../src/db';
import { Auction } from '../src/entities/auctions/model';
import redisService from '../src/redisService';

(async () => {
  const args = process.argv.slice(2);
  const auction = (await Auction.findByPk(args[0])) as Auction;
  await redisService.prepareAuction(auction);
  await auction.update({ inRedis: true });
  console.log(`Auction ${auction.id} imported to redis!`);
  process.exit();
})();
