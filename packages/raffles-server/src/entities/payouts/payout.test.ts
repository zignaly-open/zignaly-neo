import {
  waitUntilTablesAreCreated,
  createAlice,
  createAuction,
  makeBid,
  expireAuction,
  claimAuction,
  getPayouts,
} from '../../util/test-utils';
import fetchMock from 'fetch-mock-jest';
import mockCybavoWallet from '../../util/mock-cybavo-wallet';
import { zignalySystemId } from '../../../config';
import { TransactionType } from '../../cybavo';

describe('Payouts', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should show payouts after some auctions are won', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction1 = await createAuction();
    const auction2 = await createAuction();
    mockCybavoWallet(alice, 300);

    await makeBid(auction1, aliceToken);
    await makeBid(auction2, aliceToken);
    await expireAuction(auction1.id);
    await expireAuction(auction2.id);
    await claimAuction(auction1, aliceToken);
    await claimAuction(auction2, aliceToken);

    expect(fetchMock).toHaveFetched('path:/transfer/internal', {
      // can't test partial body until this PR is merged: https://github.com/wheresrhys/fetch-mock-jest/pull/32
      // body: expect.objectContaining({
      //   amount: '100',
      // }),
      body: {
        amount: '100',
        fees: '0',
        currency: 'ZIG',
        user_id: alice.publicAddress,
        to_user_id: zignalySystemId,
        locked: 'true',
        type: TransactionType.Payout,
      },
      method: 'post',
    });

    const payouts = await getPayouts(aliceToken);
    expect(payouts.length).toBe(2);
    expect(+payouts[0].auction.id).toBe(auction2.id);
    expect(+payouts[1].auction.id).toBe(auction1.id);
  });
});
