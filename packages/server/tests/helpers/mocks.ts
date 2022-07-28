import { AuctionType } from '@zigraffle/shared/types';
import { Auction, AuctionBasketItem } from '../../src/entities/auctions/model';
import { Payout } from '../../src/entities/payouts/model';
import {
  Transaction,
  TransactionType,
} from '../../src/entities/transactions/model';
import { User } from '../../src/entities/users/model';
import { signJwtToken } from '../../src/entities/users/util';
import { makeRequest } from './operation';
import { PAYOUTS_QUERY, AUCTIONS_QUERY, BALANCE_QUERY } from './queries';

export async function createAuction(
  overrides?: Partial<Auction>,
): Promise<Auction> {
  return await Auction.create({
    title: 'Test auction',
    description: 'Test auction',
    monetaryValue: '$100500',
    startingBid: '100',
    bidStep: '2',
    bidFee: '1',
    basketItems: [],
    ...overrides,
  });
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

export async function claimAuction(
  auction: Auction,
  token: string,
): Promise<any> {
  return makeRequest(
    `
     mutation {
      claim(id: "${auction.id}") {
        userBid {
          id
          value
          position
          isClaimed
        }
      }
    }`,
    token,
  );
}

export async function createAlice(): Promise<[User, string]> {
  try {
    const user = await User.create({
      username: 'Alice',
      discordName: 'Alice#2345',
      publicAddress: '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
      onboardingCompletedAt: Date.now(),
    });
    return [user, await signJwtToken(user)];
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

export async function expireAuction(auctionId: number) {
  const auction = await Auction.findByPk(auctionId);
  auction.expiresAt = new Date(Date.now() - 1000);
  await auction.save();
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

export async function getBalance(token: string): Promise<string> {
  const {
    body: {
      data: {
        balance: { balance },
      },
    },
  } = await makeRequest(BALANCE_QUERY, token);
  return balance;
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
