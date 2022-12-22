import { waitUntilTablesAreCreated, wipeOut } from '../../util/test-utils';
import { deposit } from './service';
import { getUserBalance } from './utils.test';
import { UserBalanceZhits } from './types';

describe('Balance service', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);

  describe('deposits', () => {
    it('should be able to deposit 100 zhits from 100 zigs', async () => {
      const expectedBalance = {
        walletAddress: '0x001',
        zhits: '100',
      } as UserBalanceZhits;

      await deposit({
        walletAddress: '0x001',
        amount: '100',
        currency: 'zigs',
        blockchain: 'polygon',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual(expectedBalance);
    });

    it('should be able to deposit two times 100 zigs and get 200 zhists', async () => {
      const expectedBalance = {
        walletAddress: '0x001',
        zhits: '200',
      } as UserBalanceZhits;

      // first deposit
      await deposit({
        walletAddress: '0x001',
        amount: '100',
        currency: 'zigs',
        blockchain: 'polygon',
      });

      // second deposit
      await deposit({
        walletAddress: '0x001',
        amount: '100',
        currency: 'zigs',
        blockchain: 'polygon',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual(expectedBalance);
    });
  });
});
