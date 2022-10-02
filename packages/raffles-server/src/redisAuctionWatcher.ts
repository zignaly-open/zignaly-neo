import createSubscriber from 'pg-listen';
import { postgresUrl } from '../config';
import { Auction } from './entities/auctions/model';
import redisService from './redisService';

export async function wait(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

const NOTIFY_CHANNEL = 'auction_channel';

const subscriber = createSubscriber({ connectionString: postgresUrl });

subscriber.events.on('connected', () => {
  console.log(`Listening to channel ${NOTIFY_CHANNEL}`);
});

subscriber.notifications.on(NOTIFY_CHANNEL, async (auctionId: string) => {
  console.log(`Received notification of new auction ${auctionId} ready!`);
  redisImport(auctionId);
});

subscriber.events.on('error', (error: any) => {
  console.error('Fatal database connection error:', error);
  process.exit(1);
});

process.on('exit', () => {
  subscriber.close();
});

export async function connect() {
  await subscriber.connect();
  await subscriber.listenTo(NOTIFY_CHANNEL);
}

const redisImport = async (auctionId: string) => {
  const auction = (await Auction.findByPk(auctionId)) as Auction;
  await redisService.prepareAuction(auction);
  await auction.update({ inRedis: true });
  console.log(`Auction ${auction.id} imported to redis!`);
  watchForAuctionExpiration(auctionId);
};

const watchForAuctionExpiration = async (auctionId: string) => {
  try {
    const expire = await redisService.getAuctionExpiration(+auctionId);
    const diff = Math.floor(+expire / 1000) - +new Date() + 1000;

    if (isNaN(diff)) {
      throw new Error('expire is not valid');
    }

    if (diff <= 0) {
      await redisService.finalizeAuction(+auctionId);
      console.log(`Auction ${auctionId} exported to db!`);
    } else {
      await wait(diff);
      watchForAuctionExpiration(auctionId);
    }
  } catch (e) {
    console.error(e);
  }
};
