import { User } from '../entities/users/model';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../cybavo';
export const mock = new MockAdapter(axiosInstance, {
  onNoMatch: 'throwException',
});

const randomString = (len: number) =>
  Math.random()
    .toString(36)
    .substring(2, len + 2);

const mockCybavoWallet = (user: User, initialBalance = 0) => {
  let balance = initialBalance;

  // Mock balance
  mock.onGet(`/balance/all/${user.publicAddress}`).reply(() => {
    return [
      200,
      {
        ZIG: {
          balance: balance.toString(),
        },
      },
    ];
  });

  // Mock internal transfers
  mock
    .onPost('/transfer/internal', {
      asymmetricMatch: (actual: any) => actual.user_id === user.publicAddress,
    })
    .reply((config) => {
      const { amount } = JSON.parse(config.data);
      balance -= parseFloat(amount);
      return [200, { transaction_id: randomString(8) }];
    });

  mock
    .onPost('/transfer/internal', {
      asymmetricMatch: (actual: any) =>
        actual.to_user_id === user.publicAddress,
    })
    .reply((config) => {
      const { amount } = JSON.parse(config.data);
      balance += parseFloat(amount);
      return [200, { transaction_id: randomString(8) }];
    });
};

export default mockCybavoWallet;
