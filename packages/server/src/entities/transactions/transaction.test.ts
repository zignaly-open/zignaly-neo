import '../..';
import { Transaction, TransactionType } from './model';
import {
  BALANCE_QUERY,
  createAlice,
  makeRequest,
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

    const { body } = await makeRequest(BALANCE_QUERY, aliceToken);
    expect(body.data.balance.balance).toBe('100');
  });
});
