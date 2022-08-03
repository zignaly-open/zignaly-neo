import {
  waitUntilTablesAreCreated,
  createAlice,
  createAuction,
  makeBid,
  expireAuction,
  claimAuction,
  getPayouts,
  mockUserBalance,
  clearMocks,
} from '../../util/test-utils';
import fetchMock from 'fetch-mock-jest';

describe('Payouts', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should show payouts after some auctions are won', async () => {
    fetchMock.post('path:/transfer/internal', () => ({
      transaction_id: '12345554452',
    }));

    const [alice, aliceToken] = await createAlice();
    const auction1 = await createAuction();
    const auction2 = await createAuction();
    await mockUserBalance(alice, 300);

    await makeBid(auction1, aliceToken);
    await makeBid(auction2, aliceToken);
    await expireAuction(auction1.id);
    await expireAuction(auction2.id);
    await claimAuction(auction1, aliceToken);
    await claimAuction(auction2, aliceToken);

    expect(fetchMock).toHaveFetched('path:/transfer/internal', {
      // can't test partial body until this PR is merged: https://github.com/wheresrhys/fetch-mock-jest/pull/32
      // body: expect.objectContaining({
      //   amount: 100,
      // }),
      method: 'post',
    });

    const payouts = await getPayouts(aliceToken);
    expect(payouts.length).toBe(2);
    expect(+payouts[0].auction.id).toBe(auction2.id);
    expect(+payouts[1].auction.id).toBe(auction1.id);
  });
});
