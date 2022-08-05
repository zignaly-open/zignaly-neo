import { Auction } from '../../../src/entities/auctions/model';
import pubsub from '../../../src/pubsub';
import {
  waitUntilTablesAreCreated,
  wipeOut,
  clearMocks,
  createAlice,
  makeBid,
  createAuction,
  createBasketItem,
  getAuctions,
  createBob,
  getFirstAuction,
  createRandomUser,
  wait,
  expireAuction,
} from '../../util/test-utils';
import mockCybavoWallet, { mock } from '../../util/mock-cybavo-wallet';
import { zignalySystemId } from '../../../config';
import { TransactionType } from '../../types';
import { AUCTION_FEE } from './constants';
describe('Auctions', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(() => {
    mock.reset();
  });
  afterEach(clearMocks);

  it('should not let bid on non-existing auctions', async () => {
    const [alice, aliceToken] = await createAlice();
    mockCybavoWallet(alice, 1000);
    const { body } = await makeBid(
      { id: -5 } as unknown as Auction,
      aliceToken,
    );
    expect(body.errors[0].message).toBe('Auction not found');
  });

  it('should not let bid by invalid tokens', async () => {
    const auction = await createAuction();
    const { status } = await makeBid(auction, '2121212');
    // for the 401 response, it's not handled by our endpoints
    expect(status).toBe(401);
  });

  it('should not trigger issues with duplicated auctions because of joins', async () => {
    const [, aliceToken] = await createAlice();
    const { id: auctionId } = await createAuction();

    await createBasketItem({
      ticker: 'SHT',
      amount: '100',
      auctionId,
    });
    await createBasketItem({
      ticker: 'BTC',
      amount: '100',
      auctionId,
    });

    const auctions = await getAuctions(aliceToken);
    expect(auctions.length).toBe(1);
    expect(auctions[0].basketItems.length).toBe(2);
  });

  it('should not let bid by non-existin users', async () => {
    const auction = await createAuction();
    const { body } = await makeBid(auction, '');
    // for the 401 response, it's not handled by our endpoints
    expect(body.errors[0].message).toBe('User not found');
  });

  it('should not let bid without money', async () => {
    const [alice, aliceToken] = await createAlice();
    mockCybavoWallet(alice, 0);
    const auction = await createAuction();
    const { body } = await makeBid(auction, aliceToken);
    expect(body.errors[0].message).toBe('Insufficient funds');
  });

  it('should withdraw money after making bids', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    const { body } = await makeBid(auction, aliceToken);
    expect(body.data.bid.userBid.value).toBe('100');
    const { body: body2 } = await makeBid(auction, aliceToken);
    expect(body2.data.bid.userBid.value).toBe('102');
    expect(mock.history.post[1].data).toBe(
      JSON.stringify({
        amount: AUCTION_FEE,
        fees: '0',
        currency: 'ZIG',
        user_id: alice.publicAddress,
        to_user_id: zignalySystemId,
        locked: 'true',
        type: TransactionType.Fee,
      }),
    );
  });

  it('should support the main flow', async () => {
    const [alice, aliceToken] = await createAlice();
    const [bob, bobToken] = await createBob();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    mockCybavoWallet(bob, 300);
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
      mockCybavoWallet(randomUser, 300);
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

  it('should dispatch socket events', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    const spy = jest.spyOn(pubsub, 'publish');
    mockCybavoWallet(alice, 300);
    await makeBid(auction, aliceToken);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(
      1,
      'AUCTION_UPDATED',
      expect.objectContaining({
        auctionUpdated: expect.objectContaining({
          userBid: expect.objectContaining({
            position: 1,
            user: expect.objectContaining({
              username: 'Alice',
            }),
          }),
        }),
      }),
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      'BALANCE_CHANGED',
      expect.objectContaining({
        balanceChanged: expect.objectContaining({ balance: '299.99' }),
      }),
    );
  });

  it('should change expiry time on bid', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(+new Date(initialExpiry)).toBeLessThan(+new Date(updatedExpiry));
  });

  it("should not change expiry time if it's past max limit", async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(+new Date(initialExpiry)).toBeLessThan(+new Date(updatedExpiry));
  });

  it('should increase expiry time by 1 to 4 hours when expiry is more than 1 hour', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeGreaterThanOrEqual(60 * 60_000);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeLessThanOrEqual(60 * 4 * 60_000);
  });

  it('should increase expiry time by 10 to 40 minutes when expiry is less then 1 hour and more then 1 minute', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction({
      expiresAt: new Date(Date.now() + 7200000),
    });
    mockCybavoWallet(alice, 300);
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeGreaterThanOrEqual(10 * 60_000);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeLessThanOrEqual(10 * 4 * 60_000);
  });

  it('should increase expiry time by 5 to 11 minutes when expiry is less then 1 minute', async () => {
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction({
      expiresAt: new Date(Date.now() + 50000),
    });
    mockCybavoWallet(alice, 300);
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeGreaterThanOrEqual(60_000);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeLessThanOrEqual(11 * 60_000);
  });

  it('should not bid on expired auctions', async () => {
    const [alice, aliceToken] = await createAlice();
    const [bob, bobToken] = await createBob();
    const auction = await createAuction();
    mockCybavoWallet(alice, 300);
    mockCybavoWallet(bob, 300);
    const { body } = await makeBid(auction, aliceToken);
    expect(body.data.bid.userBid.value).toBe('100');
    await expireAuction(auction.id);
    const {
      body: { errors },
    } = await makeBid(auction, bobToken);
    expect(errors[0].message).toBe('Auction expired');
    const expiredAuction = await getFirstAuction(bobToken);
    expect(expiredAuction.bids.length).toBe(1);
    expect(expiredAuction.bids[0].user.username).toBe(alice.username);
    expect(expiredAuction.userBid).toBeNull();
  });
});
