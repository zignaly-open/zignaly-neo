import supertest from 'supertest';
import app from '../../index';
import { signJwtToken } from '../../entities/users/util';
import { waitUntilTablesAreCreated, wipeOut } from '../../util/test-utils';
import { User } from '../users/model';

const request = supertest(app);

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

const getToken = async (): Promise<string> => {
  try {
    const user = await User.create(
      {
        username: 'Alice',
        publicAddress:
          '0x6a3B248855bc8a687992CBAb7FD03E1947EAee07'.toLowerCase(),
        onboardingCompletedAt: Date.now(),
      },
      { include: '' },
    );

    const token = await signJwtToken(user);
    return token;
  } catch (error) {
    console.log(error);
  }
};

describe('Balances', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);

  it('can query all balances', async () => {
    const query = `
      query {
        allBalances {
          id
          walletAddress
          transactionType
          note
          amount
          currency
          zhits
        }
      }
    `;
    const response = await makeRequest(query, '');
    expect(response.body.data.allBalances).toBeDefined();
  });

  it('can add a new deposit in balance', async () => {
    const token = await getToken();
    const query = `
      mutation {
        deposit(
          walletAddress: "0x0000"
          transactionType: "deposit"
          note: "deposit"
          amount: 100
          currency: "ETH"
          zhits: 0
        ) {
          id
          walletAddress
          transactionType
          note
          amount
          currency
          zhits
        }
      }
      `;

    const response = await makeRequest(query, token);
    expect(response.body.data.deposit).toBeDefined();

    const queryDeposit = `
      query {
        allBalances {
          id
          walletAddress
          transactionType
          note
          amount
          currency
          zhits
        }
      }
    `;
    const expectedRow = {
      id: '1',
      walletAddress: '0x0000',
      transactionType: 'deposit',
      note: 'deposit',
      amount: 100,
      currency: 'ETH',
      zhits: 0,
    };
    const responseDeposit = await makeRequest(queryDeposit, token);
    expect(responseDeposit.body.data.allBalances[0]).toEqual(expectedRow);
  });

  it('should be able to get deposits by wallet', async () => {
    try {
      const token = await getToken();
      const addDeposit = `
      mutation {
        deposit(
          walletAddress: "0x0001"
          transactionType: "deposit"
          note: "deposit"
          amount: 100
          currency: "ETH"
          zhits: 0
        ) {
          id
          walletAddress
          transactionType
          note
          amount
          currency
          zhits
        }
      }
      `;
      await makeRequest(addDeposit, token);
      const walletDeposits = `
      query {
        getDepositsByWalletAddress(walletAddress: "0x0001") {
          id
          walletAddress
          transactionType
          note
          amount
          currency
          zhits
        }
      }
      `;
      const expectedDeposit = {
        id: '2',
        walletAddress: '0x0001',
        transactionType: 'deposit',
        note: 'deposit',
        amount: 100,
        currency: 'ETH',
        zhits: 0,
      };

      const response = await makeRequest(walletDeposits, token);
      expect(response.body.data.getDepositsByWalletAddress[0]).toEqual(
        expectedDeposit,
      );
    } catch (error) {
      console.log(error);
    }
  });
});
