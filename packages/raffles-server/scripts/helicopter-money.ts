import redisService from '../src/redisService';
import '../src/db';
import { Auction } from '../src/entities/auctions/model';

// const gibsMeDat = async (userId: string): Promise<void> => {
//   try {
//     await redisService.redis.hset(
//       'USER_CURRENT_BALANCE',
//       userId,
//       strToUnit('10000000000'),
//     );
//   } catch (e) {
//     console.error(e);
//   }
// };

(async () => {
  await Auction.destroy({ where: { id: 13 } });
  const auction = await Auction.create({
    id: 13,
    expiresAt: '2023-02-10T13:30:00.511Z',
    maxExpiryDate: '2023-02-10T13:30:00.511Z',
    imageUrl: '/images/4.jpg',
    title: 'Most stressful auction',
    description: 'Click',
    currentBid: '0.07',
    website: 'https://zignaly.com/',
    discord: 'https://zignaly.com/',
    twitter: 'https://zignaly.com/',
    telegram: 'https://zignaly.com/',
  });
  await redisService.redisImport(auction.id, false);
})();
