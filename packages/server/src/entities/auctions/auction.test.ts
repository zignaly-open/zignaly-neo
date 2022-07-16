import '../..';
import {
  createAlice,
  createAuction,
  createBob,
  createRandomUser,
  getFirstAuction,
  giveMoney,
  makeBid,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../util/test-utils';

describe('Auctions', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);

  it('should not let bid without money', async () => {
    const [, aliceToken] = await createAlice();
    const auction = await createAuction();
    const { body } = await makeBid(auction, aliceToken);
    expect(body.errors[0].message).toBe('Insufficient funds');
  });

  it('should withdraw money after making bids', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300); // fisting is three hundred bucks
    const { body } = await makeBid(auction, aliceToken);
    expect(body.data.bid.userBid.value).toBe('100');
    const { body: body2 } = await makeBid(auction, aliceToken);
    expect(body2.data.bid.userBid.value).toBe('102');
  });

  it('should support the main flow', async () => {
    const [alice, aliceToken] = await createAlice();
    const [bob, bobToken] = await createBob();
    const auction = await createAuction();
    await giveMoney(alice, 300);
    await giveMoney(bob, 300);
    const auctionBeforeBids = await getFirstAuction(aliceToken);
    expect(auctionBeforeBids.minimalBid).toBe(auctionBeforeBids.startingBid);
    expect(auctionBeforeBids.minimalBid).toBe('100');
    expect(auctionBeforeBids.bids.length).toBe(0);

    await makeBid(auction, aliceToken);
    const auctionAfter1BidAlice = await getFirstAuction(aliceToken);
    expect(auctionAfter1BidAlice.minimalBid).toBe('102');
    expect(auctionAfter1BidAlice.bids[0].value).toBe('100');
    expect(auctionAfter1BidAlice.userBid.value).toBe('100');
    expect(auctionAfter1BidAlice.userBid.position).toBe(1);
    const auctionAfter1BidBob = await getFirstAuction(bobToken);
    expect(auctionAfter1BidBob.userBid).toBeFalsy();
    expect(auctionAfter1BidBob.minimalBid).toBe('102');

    await makeBid(auction, bobToken);
    const auctionAfter2BidsAlice = await getFirstAuction(aliceToken);
    expect(auctionAfter2BidsAlice.minimalBid).toBe('104');
    expect(auctionAfter2BidsAlice.bids[0].position).toBe(1);
    expect(auctionAfter2BidsAlice.bids[1].position).toBe(2);
    expect(auctionAfter2BidsAlice.bids[0].user.username).toBe('Bob');
    expect(auctionAfter2BidsAlice.bids[1].user.username).toBe('Alice');
    expect(auctionAfter2BidsAlice.userBid.position).toBe(2);

    for (let i = 0; i < 50; i++) {
      const [randomUser, randomUserToken] = await createRandomUser();
      await giveMoney(randomUser, 300);
      await makeBid(auction, randomUserToken);
    }

    await makeBid(auction, aliceToken);
    const auctionAfter50BidsAlice = await getFirstAuction(aliceToken);
    const auctionAfter50BidsBob = await getFirstAuction(bobToken);
    expect(auctionAfter50BidsAlice.bids.length).toBe(10);
    expect(auctionAfter50BidsAlice.bids[0].position).toBe(1);
    expect(auctionAfter50BidsAlice.bids[0].user.username).toBe('Alice');
    const npcBids = auctionAfter50BidsAlice.bids.slice(1);
    expect(npcBids.every((x) => !x.user.username)).toBeTruthy();
    expect(auctionAfter50BidsAlice.userBid.position).toBe(1);

    expect(auctionAfter50BidsBob.bids.length).toBe(11);
    expect(auctionAfter50BidsBob.bids[0].user.username).toBe('Alice');
    expect(auctionAfter50BidsBob.bids[10].user.username).toBe('Bob');
    expect(auctionAfter50BidsBob.bids[10].position).toBe(52);
    expect(auctionAfter50BidsBob.userBid.position).toBe(52);
  });

  it('should dispatch socket events', async () => {});
  it('should users claim their victories only after the expiry', async () => {});
  it('should change expiry time on bid', async () => {});
  it("should not change expiry time if it's past max limit", async () => {});
  it('should change expiry time', async () => {});
});
