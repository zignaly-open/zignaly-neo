import supertest from 'supertest';
import { User } from '../entities/users/model';
import app from '../index';
import { signJwtToken } from '../entities/users/util';
import {
  Auction,
  AuctionBasketItem,
  AuctionBid,
} from '../entities/auctions/model';
import { AuctionStatus, AuctionType } from '@zigraffle/shared/types';
import { Transaction, TransactionType } from '../entities/transactions/model';
import { isTest } from '../../config';
import { persistTablesToTheDatabase } from '../db';

const request = supertest(app);

export async function createAuction(): Promise<Auction> {
  return await Auction.create({
    title: 'Test auction',
    description: 'Test auction',
    monetaryValue: '$100500',
    startingBid: '100',
    bidStep: '2',
    status: AuctionStatus.Active,
    basketItems: [],
  });
}

export async function getAuctions(token: string): Promise<AuctionType[]> {
  const auctions = await makeRequest(AUCTIONS_QUERY, token);
  return auctions.body.data.auctions;
}

export async function getFirstAuction(token: string): Promise<AuctionType> {
  return (await getAuctions(token))[0];
}

export async function makeBid(auction: Auction, token: string): Promise<any> {
  return makeRequest(
    `
   mutation {
    bid(id: "${auction.id}") {
      bids {
        value
        user {
          id
          username
        }
      }

      userBid {
        id
        value
        position
      }
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

export async function createAlice(): Promise<[User, string]> {
  const user = await User.create({
    username: 'Alice',
    publicAddress: '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
    onboardingCompletedAt: Date.now(),
  });
  return [user, await signJwtToken(user)];
}

export async function createBob(): Promise<[User, string]> {
  try {
    const user = await User.create({
      username: 'Bob',
      publicAddress: '0xE288AE3acccc630781354da2AA64379A0d4C56dB'.toLowerCase(),
      onboardingCompletedAt: Date.now(),
    });
    return [user, await signJwtToken(user)];
  } catch (e) {
    console.error(e);
  }
}

export async function createRandomUser(): Promise<[User, string]> {
  try {
    const user = await User.create({
      username: null,
      publicAddress: '0xE288AE3acccc630'.toLowerCase() + Math.random(),
      onboardingCompletedAt: Date.now(),
    });
    return [user, await signJwtToken(user)];
  } catch (e) {
    console.error(e);
  }
}

export async function giveMoney(user: User, money: number | string) {
  await Transaction.create({
    userId: user.id,
    value: money.toString(),
    block: 1,
    auctionId: null,
    txHash: 'privet' + Math.random(),
    type: TransactionType.Deposit,
  });
}

export async function makeRequest(gql: string, token: string): Promise<any> {
  return request
    .post('/graphql')
    .set('Authorization', 'Bearer ' + token)
    .send({
      query: gql,
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

export const AUCTIONS_QUERY = `
  query {
    auctions {
      id
      title
      createdAt
      expiresAt
      status
      minimalBid
      website
      twitter
      telegram
      discord
      bidFee
      description
      imageUrl
      startingBid
      basketItems {
        ticker
        amount
      }
      monetaryValue
      bids {
        id
        position
        value
        user {
          id
          username
        }
      }

      userBid {
        id
        value
        position
      }
    }
  }
`;

export async function wipeOut() {
  if (isTest) {
    try {
      // pls do not run it in prod lol
      await Transaction.destroy({ where: {} });
      await AuctionBid.destroy({ where: {} });
      await AuctionBasketItem.destroy({ where: {} });
      await Auction.destroy({ where: {} });
      await User.destroy({ where: {} });
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
