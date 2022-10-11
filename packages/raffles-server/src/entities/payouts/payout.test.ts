import {
  waitUntilTablesAreCreated,
  createAlice,
  createAuction,
  makeBid,
  expireAuction,
  claimAuction,
  getPayouts,
} from '../../util/test-utils';
import { zignalySystemId } from '../../../config';
import { TransactionType } from '../../types';
import { mock } from '../../util/mock-cybavo-wallet';
import redisService from '../../redisService';

describe('Payouts', () => {
  beforeAll(waitUntilTablesAreCreated);
  afterEach(() => {
    mock.reset();
  });
  afterAll(async () => {
    await redisService.redis.quit();
  });

  it('should show payouts after some auctions are won', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction1 = await createAuction();
    // const auction2 = await createAuction();

    await makeBid(auction1, aliceToken);
    // await makeBid(auction2, aliceToken);
    await expireAuction(auction1.id);
    // await expireAuction(auction2.id);
    await claimAuction(auction1, aliceToken);
    // await claimAuction(auction2, aliceToken);

    expect(mock.history.post[1].data).toBe(
      JSON.stringify({
        amount: '101',
        fees: '0',
        currency: 'ZIG',
        user_id: alice.publicAddress,
        to_user_id: zignalySystemId,
        // locked: 'true',
        type: TransactionType.Payout,
      }),
    );

    const payouts = await getPayouts(aliceToken);
    expect(payouts.length).toBe(1);
    // expect(+payouts[0].auction.id).toBe(auction2.id);
    expect(+payouts[0].auction.id).toBe(auction1.id);
  });
});
