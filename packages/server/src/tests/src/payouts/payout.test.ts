import {
  createAlice,
  createAuction,
  giveMoney,
  makeBid,
  expireAuction,
  claimAuction,
  getPayouts,
} from '../../helpers/mocks';
import { waitUntilTablesAreCreated } from '../../helpers/operation';

describe('Payouts', () => {
  beforeAll(waitUntilTablesAreCreated);

  it('should show payouts after some auctions are won', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction1 = await createAuction();
    const auction2 = await createAuction();
    await giveMoney(alice, 300);
    await makeBid(auction1, aliceToken);
    await makeBid(auction2, aliceToken);
    await expireAuction(auction1.id);
    await expireAuction(auction2.id);
    await claimAuction(auction1, aliceToken);
    await claimAuction(auction2, aliceToken);

    const payouts = await getPayouts(aliceToken);
    expect(payouts.length).toBe(2);
    expect(+payouts[0].auction.id).toBe(auction2.id);
    expect(+payouts[1].auction.id).toBe(auction1.id);
  });
});
