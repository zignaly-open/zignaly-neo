import '../..';
import { Transaction, TransactionType } from './model';
import {
  createAlice,
  getBalance,
  waitUntilTablesAreCreated,
} from '../../util/test-utils';

describe('Transactions', () => {
  beforeAll(waitUntilTablesAreCreated);

  it('Deposit should be reflected in the balance', async () => {
    const [alice, aliceToken] = await createAlice();
    await Transaction.create({
      userId: alice.id,
      value: '100',
      block: 1,
      auctionId: null,
      txHash: 'privet',
      type: TransactionType.Deposit,
    });

    expect(await getBalance(aliceToken)).toBe('100');
  });
});
