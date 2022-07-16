import '../..';
import {
  createAlice,
  createAuction,
  giveMoney,
  makeBid,
  wipeOut,
} from '../../util/test-utils';

describe('Auctions', () => {
  beforeAll(async () => {
    // wait for the main app to be initialized
    await new Promise((r) => setTimeout(r, 2000));
  });

  beforeEach(wipeOut);

  it('Should not let bid without money', async () => {
    const [, aliceToken] = await createAlice();
    const auction = await createAuction();
    const { body } = await makeBid(auction, aliceToken);
    expect(body.errors[0].message).toBe('Insufficient funds');
  });

  it('Should withdraw money after making bids', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300); // fisting is three hundred bucks
    const { body } = await makeBid(auction, aliceToken);
    expect(body.data.bid.userBid.value).toBe('100');
    const { body: body2 } = await makeBid(auction, aliceToken);
    expect(body2.data.bid.userBid.value).toBe('102');
  });
});
