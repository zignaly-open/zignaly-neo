import { waitUntilTablesAreCreated, wipeOut } from '../../util/test-utils';
import {
  deposit,
  redeemCode,
  claim,
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

  describe('Pay Fee', () => {
    it('should be able to pay zhits fee for the last auction', async () => {
      const expectedBalance = {
        walletAddress: '0x001',
        zhits: '98',
      } as UserBalanceZhits;

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

      expect(userBalance.zhits).toEqual(expectedBalance.zhits);
    });
  });

  describe('Redeem Code', () => {
    it('should be able to redeem a code of 200 zhits', async () => {
      const expectedBalance = {
        walletAddress: '0x001',
        zhits: '400',
      } as UserBalanceZhits;

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

      expect(userBalance).toEqual(expectedBalance);
    });
  });

  describe('Claim', () => {
    it('should be able to redeem a code of 200 zhits', async () => {
      const expectedBalance = {
        walletAddress: '0x001',
        zhits: '0',
      } as UserBalanceZhits;

      await deposit({
        walletAddress: '0x001',
        amount: '200',
        currency: '0x999',
        blockchain: 'polygon',
      });

      await claim({
        walletAddress: '0x001',
        zhits: '200',
        note: 'code number',
      });

      const userBalance: UserBalanceZhits = await getUserBalance('0x001');

      expect(userBalance).toEqual(expectedBalance);
    });
  });
});
