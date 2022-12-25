import { waitUntilTablesAreCreated, wipeOut } from '../../util/test-utils';
import {
  deposit,
  redeemCode,
  makePayout,
  payFee,
  getUserBalance,
  importBalance,
  importBalanceBulk,
} from './service';
import { getImportBalance } from './utils';
import { ImportBalanceZhits, UserBalanceZhits, Import } from './types';

describe('Balance service', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);

  describe('Import Cybavo', () => {
    it('should be able to import one balance users from cybavo', async () => {
      await importBalance({
        walletAddress: '0x001',
        zhits: '100',
      });

      const balance: ImportBalanceZhits = await getImportBalance();
      expect(balance.zhits).toEqual('100');
    });

    it('should be able to bulk import for multiple users from cybavo', async () => {
      await importBalanceBulk([
        {
          walletAddress: '0x001',
          zhits: '1000',
          transactionType: Import.Import,
        },
        {
          walletAddress: '0x001',
          zhits: '1000',
          transactionType: Import.Import,
        },
      ]);

      const balance: ImportBalanceZhits = await getImportBalance();
      expect(balance.zhits).toEqual('2000');
    });
  });

  describe('deposits', () => {
    it('should be able to deposit 100 zhits from 100 zigs', async () => {
      await deposit({
        walletAddress: '0x001',
        amount: '100',
        currency: 'zigs',
        blockchain: 'polygon',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual('100');
    });

    it('should not be able to deposit 0 amount', async () => {
      try {
        await deposit({
          walletAddress: '0x001',
          amount: '0',
          currency: 'zigs',
          blockchain: 'polygon',
        });
      } catch (error) {
        expect(error.message).toEqual('Invalid amount');
      }
    });

    it('should be able to make multiple deposit to same address', async () => {
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

      expect(userBalance).toEqual('200');
    });
  });

  describe('Pay Fee', () => {
    it('should be able to pay zhits fee for the last auction', async () => {
      const expectedBalance = '98';

      await deposit({
        walletAddress: '0x001',
        amount: '100',
        currency: 'zigs',
        blockchain: 'polygon',
      });

      await payFee({
        walletAddress: '0x001',
        zhits: '2',
        note: '',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual(expectedBalance);
    });
  });

  describe('Redeem Code', () => {
    it('should be able to redeem a code of 200 zhits', async () => {
      await deposit({
        walletAddress: '0x001',
        amount: '200',
        currency: '0x999',
        blockchain: 'polygon',
      });

      await redeemCode({
        walletAddress: '0x001',
        zhits: '200',
        note: 'code number',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual('400');
    });
  });

  describe('Make Payout', () => {
    it('should be able to redeem a code of 200 zhits', async () => {
      await deposit({
        walletAddress: '0x001',
        amount: '200',
        currency: '0x999',
        blockchain: 'polygon',
      });

      await makePayout({
        walletAddress: '0x001',
        zhits: '200',
        note: 'code number',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual('0');
    });
  });
});
