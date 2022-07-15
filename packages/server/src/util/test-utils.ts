import supertest from 'supertest';
import { User } from '../entities/users/model';
import app from '../index';
import { signJwtToken } from '../entities/users/util';

const request = supertest(app);

export async function createAlice(): Promise<[User, string]> {
  const user = await User.create({
    username: 'Alice',
    publicAddress: '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
    onboardingCompletedAt: Date.now(),
  });
  return [user, await signJwtToken(user)];
}

export async function createBob(): Promise<[User, string]> {
  const user = await User.create({
    username: 'Alice',
    publicAddress: '0xE288AE3acccc630781354da2AA64379A0d4C56dB'.toLowerCase(),
    onboardingCompletedAt: Date.now(),
  });
  return [user, await signJwtToken(user)];
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
