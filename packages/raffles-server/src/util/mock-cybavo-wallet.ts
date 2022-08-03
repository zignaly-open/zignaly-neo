import fetchMock from 'fetch-mock-jest';
fetchMock.config.overwriteRoutes = false;
import { User } from '../entities/users/model';

const randomString = (len: number) =>
  Math.random()
    .toString(36)
    .substring(2, len + 2);

const mockCybavoWallet = (user: User, initialBalance = 0) => {
  let balance = initialBalance;

  // async function mockUserBalance(user: User, money: number | string) {
  fetchMock.get(`path:/balance/all/${user.publicAddress}`, {
    ZIG: {
      balance: balance.toString(),
    },
  });
  // }

  async function mockTransfer() {
    fetchMock.post(
      {
        url: 'path:/transfer/internal',
        body: { user_id: user.publicAddress },
        matchPartialBody: true,
      },
      (_, options: any) => {
        const { amount } = JSON.parse(options.body);
        balance -= parseFloat(amount);
        return { transaction_id: randomString(8) };
      },
    );

    fetchMock.post(
      {
        url: 'path:/transfer/internal',
        body: { to_user_id: user.publicAddress },
        matchPartialBody: true,
      },
      (_, options: any) => {
        const { amount } = JSON.parse(options.body);
        balance += parseFloat(amount);
        return { transaction_id: randomString(8) };
      },
    );
  }

  mockTransfer();
  // mockUserBalance();
  return { mockTransfer, getBalance: () => balance.toString() };
};
export default mockCybavoWallet;
