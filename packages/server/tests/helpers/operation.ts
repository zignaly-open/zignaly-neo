import supertest from 'supertest';
import app from '../../src';
import { isTest } from '../../config';
import { persistTablesToTheDatabase } from '../../src/db';
import {
  Auction,
  AuctionBasketItem,
  AuctionBid,
} from '../../src/entities/auctions/model';
import { Payout } from '../../src/entities/payouts/model';
import { Transaction } from '../../src/entities/transactions/model';
import { User } from '../../src/entities/users/model';

const request = supertest(app);

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

export async function makeRequest(gql: string, token: string): Promise<any> {
  let r = request.post('/graphql');
  if (token) r = r.set('Authorization', 'Bearer ' + token);
  return r
    .send({
      query: gql,
    })
    .set('Accept', 'application/json');
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
      await Transaction.destroy(options);
      await AuctionBasketItem.destroy(options);
      await Auction.destroy(options);
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
