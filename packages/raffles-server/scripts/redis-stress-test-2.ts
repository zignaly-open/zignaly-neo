import crypto from 'crypto';
import axios from 'axios';
import http from 'http';
import { port } from '../config';
import { Code } from '../src/entities/codes/model';
import redisService, { strToUnit } from '../src/redisService';
import { Auction } from '../src/entities/auctions/model';
import '../src/db';
import { signJwtToken } from '../src/entities/users/util';
import { User } from '../src/entities/users/model';

const numberOfUsers = 10;
const bidsPerSecond = 2;

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
});

const createAuction = async () => {
  try {
    await Auction.destroy({ where: { id: 13 } });
    return await Auction.create({
      id: 13,
      expiresAt: '2029-09-10T12:30:00.511Z',
      chain: 'DOGE',
      maxExpiryDate: '2029-10-05T13:30:00.511Z',
      imageUrl: '/images/4.jpg',
      title: 'Most stressful auction',
      description: 'Click',
      currentBid: '0.01',
      website: 'https://zignaly.com/',
      discord: 'https://zignaly.com/',
      twitter: 'https://zignaly.com/',
      telegram: 'https://zignaly.com/',
    });
  } catch (e) {
    console.error(e);
  }
};

const createUser = async (): Promise<string> => {
  try {
    const user = await User.create(
      {
        username: 'Alice ' + Math.random(),
        publicAddress: (
          '0x' + crypto.randomBytes(40).toString('hex')
        ).toLowerCase(),
        onboardingCompletedAt: Date.now() - 1000,
      },
      { include: Code },
    );

    await redisService.redis.hset(
      'USER_CURRENT_BALANCE',
      user.id.toString(),
      strToUnit('10000000000'),
    );

    return await signJwtToken(user);
  } catch (e) {
    console.error(e);
  }
};

const setUpUsersAndAuctions = async () => {
  try {
    const auction = await createAuction();
    for (let i = 0; i < numberOfUsers; i++) {
      await createUser().then((token) => {
        makeBidEveryNthOfSecond(token, auction.id.toString(), bidsPerSecond);
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const makeBidEveryNthOfSecond = async (
  token: string,
  auctionId: string,
  n: number,
) => {
  bid(auctionId, token);
  console.log('bid ' + token);
  await new Promise((r) => setTimeout(r, Math.round(1000 / n)));
};

const bid = (auctionId: string, token: string) =>
  axios
    .post(
      `http://localhost:${port}/graphql`,
      {
        operationName: 'createBid',
        query: `
          mutation createBid($id: ID!) {
            bid(id: $id)
          }
        `,
        variables: { id: auctionId },
      },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
        httpAgent,
      },
    )
    .catch((e) => {
      console.error(e.response.data);
    });

(async () => {
  setUpUsersAndAuctions();
})();
