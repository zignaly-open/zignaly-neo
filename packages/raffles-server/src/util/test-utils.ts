import supertest from 'supertest';
import { User } from '../entities/users/model';
import app from '../index';
import { signJwtToken } from '../entities/users/util';
import {
  Auction,
  AuctionBasketItem,
  AuctionBid,
} from '../entities/auctions/model';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import { isTest } from '../../config';
import { persistTablesToTheDatabase } from '../db';
import { Payout } from '../entities/payouts/model';
import mockCybavoWallet, { MockedCybavo } from './mock-cybavo-wallet';
import redisService from '../redisService';
import { Code, CodeRedemption } from '../entities/codes/model';
import { generateCode } from '../entities/codes/util';
import {
  DEFAULT_BENEFIT_DIRECT,
  DEFAULT_MAX_TOTAL_BENEFITS,
  DEFAULT_MAX_TOTAL_REWARDS,
  DEFAULT_REQ_MINIMUM_DEPOSIT,
  DEFAULT_REWARD_DIRECT,
} from '../entities/codes/constants';

const request = supertest(app);

export async function createAuction(
  overrides?: Partial<Auction>,
  saveToRedis = true,
): Promise<Auction> {
  const auction = await Auction.create({
    title: 'Test auction',
    description: 'Test auction',
    monetaryValue: '$100500',
    currentBid: '100',
    bidStep: '1',
    bidFee: '1',
    expiresAt: Date.now() + 7 * 24 * 3600_000,
    maxExpiryDate: Date.now() + 8 * 24 * 3600_000,
    maxClaimDate: Date.now() + 10 * 24 * 3600_000,
    ...overrides,
  });
  if (saveToRedis) {
    await redisService.prepareAuction(auction);
    await auction.update({ inRedis: true });
  }
  return auction;
}

export async function createBasketItem(
  item: Partial<AuctionBasketItem>,
): Promise<AuctionBasketItem> {
  return await AuctionBasketItem.create(item);
}

export async function getPayouts(token: string): Promise<Payout[]> {
  const auctions = await makeRequest(PAYOUTS_QUERY, token);
  return auctions.body.data.payouts;
}

export async function getAuctions(
  token: string,
  unannounced = false,
  privateCode = '',
): Promise<AuctionType[]> {
  const AUCTIONS_QUERY = `
  query ($filter: AuctionFilter) {
    items: allAuctions(filter: $filter) {
      id
      title
      expiresAt
      currentBid
      website
      twitter
      telegram
      discord
      bidFee
      description
      imageUrl
      claimSuccess
      isClaimed
      bids {
        position
        user {
          id
          username
        }
      }
    },
    total: _allAuctionsMeta(filter: $filter) {
      count
    }
  }
  `;
  const filter = { unannounced, privateCode };
  const auctions = await makeRequest(AUCTIONS_QUERY, token, {
    perPage: 100,
    filter,
  });
  return auctions.body.data.items;
}

export async function getBalance(token: string): Promise<any> {
  const balance = await makeRequest(BALANCE_QUERY, token);
  return balance.body.data.balance;
}

export async function getFirstAuction(token: string): Promise<AuctionType> {
  return (await getAuctions(token))[0];
}

export async function makeBid(auction: Auction, token: string): Promise<any> {
  return makeRequest(
    `
   mutation {
    bid(id: "${auction.id}")
  }`,
    token,
  );
}

export async function claimAuction(
  auction: Auction,
  token: string,
): Promise<any> {
  return makeRequest(
    `
   mutation {
    claim(id: "${auction.id}") {
      id
      isClaimed
    }
  }`,
    token,
  );
}

export async function checkUsername(
  username: string,
  token: string,
): Promise<any> {
  // sure this is not prod way of doing stuff, but this file is called test-utils
  const {
    body: {
      data: { checkUsername: result },
    },
  } = await makeRequest(
    `
   query {
    checkUsername(username: "${username.replace(/"/, "''")}")
  }`,
    token,
  );
  return result;
}

export async function changeUsername(
  username: string,
  token: string,
): Promise<any> {
  // sure this is not prod way of doing stuff, but this file is called test-utils
  const {
    body: {
      data: { updateProfile },
    },
  } = await makeRequest(
    `
   mutation {
    updateProfile(username: "${username.replace(/"/, "''")}") {
      username
    }
  }`,
    token,
  );
  return updateProfile;
}

export async function changeDiscordName(
  discordName: string,
  token: string,
): Promise<any> {
  // sure this is not prod way of doing stuff, but this file is called test-utils
  const {
    body: {
      data: { updateProfile },
    },
  } = await makeRequest(
    `
   mutation {
    updateProfile(discordName: "${discordName.replace(/"/, "''")}") {
      discordName
    }
  }`,
    token,
  );
  return updateProfile;
}

export async function createAlice(
  balance = 0,
): Promise<[User, string, MockedCybavo]> {
  try {
    const user = await User.create(
      {
        username: 'Alice',
        publicAddress:
          '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
        onboardingCompletedAt: Date.now(),
      },
      { include: Code },
    );
    // Load associations
    await user.reload();

    const cybavoMock = await mockCybavoWallet(user, balance);
    return [user, await signJwtToken(user), cybavoMock];
  } catch (e) {
    console.error(e);
  }
}

export async function createAlicesDiscord(): Promise<[User, string]> {
  try {
    const user = await User.create({
      discordName: 'Alicese#3333',
      publicAddress: '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
      onboardingCompletedAt: Date.now(),
    });
    return [user, await signJwtToken(user)];
  } catch (e) {
    console.error(e);
  }
}

export async function createBob(
  balance = 0,
): Promise<[User, string, MockedCybavo]> {
  try {
    const user = await User.create(
      {
        username: 'Bob',
        publicAddress:
          '0xE288AE3acccc630781354da2AA64379A0d4C56dB'.toLowerCase(),
        onboardingCompletedAt: Date.now(),
      },
      { include: Code },
    );
    // Load associations
    await user.reload();
    const cybavoMock = await mockCybavoWallet(user, balance);
    return [user, await signJwtToken(user), cybavoMock];
  } catch (e) {
    console.error(e);
  }
}

export async function createBobDiscord(): Promise<[User, string]> {
  try {
    const user = await User.create({
      discordName: 'Bob#3333',
      publicAddress: '0xE288AE3acccc630781354da2AA64379A0d4C56dB'.toLowerCase(),
      onboardingCompletedAt: Date.now(),
    });
    return [user, await signJwtToken(user)];
  } catch (e) {
    console.error(e);
  }
}

export async function createRandomUser(
  balance = 0,
  overrides?: Partial<User>,
): Promise<[User, string, MockedCybavo]> {
  try {
    const user = await User.create(
      {
        username: null,
        publicAddress: '0xE288AE3acccc630'.toLowerCase() + Math.random(),
        onboardingCompletedAt: Date.now(),
        ...overrides,
      },
      { include: Code },
    );
    // Load associations
    await user.reload();
    const cybavoMock = await mockCybavoWallet(user, balance);
    return [user, await signJwtToken(user), cybavoMock];
  } catch (e) {
    console.error(e);
  }
}

export async function makeRequest(
  gql: string,
  token: string,
  variables = {},
): Promise<any> {
  let r = request.post('/graphql');
  if (token) r = r.set('Authorization', 'Bearer ' + token);
  return r
    .send({
      query: gql,
      variables,
    })
    .set('Accept', 'application/json');
}

export const BALANCE_QUERY = `
  query balance {
    balance {
      id
      balance
    }
  }
`;

export const PAYOUTS_QUERY = `
  query payouts {
    payouts {
      id
      auction {
        id
        title
      }
      toWallet
    }
  }
`;

export async function checkCode(code: string, token: string): Promise<any> {
  return makeRequest(
    `
   query {
    checkCode(code: "${code}") { 
      code {
        code
        reqMinimumBalance
        reqMinimumDeposit
        reqDepositFrom
        reqMinAuctions
        reqWalletType
        benefitDirect
        benefitBalanceFactor
        benefitDepositFactor
        maxTotalBenefits
      }
      balance
      deposits
     }
  }`,
    token,
  );
}

export async function redeemCode(code: string, token: string): Promise<any> {
  return makeRequest(
    `
   mutation {
    redeemCode(code: "${code}")
  }`,
    token,
  );
}

export async function userCodes(token: string): Promise<any> {
  return makeRequest(
    `
   query {
    userCodes {
      code
      benefitDirect
      rewardDirect
      maxRedemptions
      currentRedemptions
      endDate
      rewardFactor
      rewardDepositFactor
      maxTotalRewards
    }
  }`,
    token,
  );
}

export async function userCodesRedemptions(token: string): Promise<any> {
  return makeRequest(
    `
   query {
    userCodesRedemptions {
      code
      redemptionDate
      inviterBenefit
      invitedBenefit
      invited {
        shortAddress
        username
      }
    }
  }`,
    token,
  );
}

export async function createCode(overrides?: Partial<Code>) {
  return Code.create({
    code: generateCode(),
    benefitDirect: DEFAULT_BENEFIT_DIRECT,
    rewardDirect: DEFAULT_REWARD_DIRECT,
    reqMinimumDeposit: DEFAULT_REQ_MINIMUM_DEPOSIT,
    maxTotalBenefits: DEFAULT_MAX_TOTAL_BENEFITS,
    maxTotalRewards: DEFAULT_MAX_TOTAL_REWARDS,
    ...overrides,
  });
}

export async function clearMocks() {
  jest.clearAllMocks();
}

export async function wipeOut() {
  if (isTest) {
    try {
      // pls do not run it in prod lol
      const options = { where: {}, cascade: true, force: true, truncate: true };
      await Payout.destroy(options);
      await AuctionBid.destroy(options);
      await AuctionBasketItem.destroy(options);
      await Auction.destroy(options);
      await Code.findAll();
      await CodeRedemption.destroy(options);
      await Code.destroy(options);
      await User.destroy(options);
    } catch (e) {
      console.error(e);
    }
  }
}

let persisted = false;

export async function waitUntilTablesAreCreated() {
  if (persisted) return;
  await persistTablesToTheDatabase();
  persisted = true;
}

export async function wait(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

export async function expireAuction(auctionId: number, finalize = true) {
  const auction = await Auction.findByPk(auctionId);
  auction.expiresAt = new Date(Date.now() - 1000);
  await auction.save();
  await redisService.redis.hset(
    `AUCTION:${auctionId}`,
    'expire',
    +auction.expiresAt * 1000,
  );

  if (finalize) {
    await redisService.finalizeAuction(auctionId);
  }
}

export async function startAuction(auctionId: number) {
  const auction = await Auction.findByPk(auctionId);
  auction.startDate = new Date(Date.now() - 1000);
  await auction.save();
  await redisService.redis.hset(
    `AUCTION:${auctionId}`,
    'start',
    +auction.startDate * 1000,
  );
}
