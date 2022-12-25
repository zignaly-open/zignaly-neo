import { Auction } from '../../../src/entities/auctions/model';
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
  startAuction,
  updateAuction,
  deleteAuction,
} from '../../util/test-utils';
import redisService from '../../redisService';
import pubsub from '../../pubsub';

describe('Auctions', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(() => {
    clearMocks();
  });
  afterAll(async () => {
    await redisService.redis.quit();
  });

  it('should not let bid on non-existing auctions', async () => {
    const [, aliceToken] = await createAlice(1000);
    const { body } = await makeBid(
      { id: -5 } as unknown as Auction,
      aliceToken,
    );
    expect(body.errors[0].message).toBe('Auction expired');
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
  });

  it('should not let bid by non-existin users', async () => {
    const auction = await createAuction();
    const { body } = await makeBid(auction, '');
    // for the 401 response, it's not handled by our endpoints
    expect(body.errors[0].message).toBe('User not found');
  });

  it('should not let bid without money', async () => {
    const [, aliceToken] = await createAlice(0);
    const auction = await createAuction();
    const { body } = await makeBid(auction, aliceToken);
    expect(body.errors[0].message).toBe('Insufficient balance');
  });

  it('should not let bid with money than bidFee', async () => {
    const [, aliceToken] = await createAlice(0.001);
    const auction = await createAuction();
    const { body } = await makeBid(auction, aliceToken);
    expect(body.errors[0].message).toBe('Insufficient balance');
  });

  it('should withdraw money after making bids', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    const ranking = await redisService.getAuctionRanking(auction.id);
    expect(ranking).toContain(alice.id.toString());
    // todo: expire auction and test transfers
  });

  it('should support the main flow', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const [bob, bobToken] = await createBob(300);
    const auction = await createAuction();
    const auctionBeforeBids = await getFirstAuction(aliceToken);
    expect(auctionBeforeBids.currentBid).toBe('100.00');
    expect(auctionBeforeBids.bids.length).toBe(0);

    await makeBid(auction, aliceToken);
    const auctionAfter1BidAlice = await getFirstAuction(aliceToken);
    expect(auctionAfter1BidAlice.currentBid).toBe('101.00');
    expect(auctionAfter1BidAlice.bids[0].user.id).toBe(alice.id);
    expect(
      auctionAfter1BidAlice.bids.find((b) => b.user.id === alice.id).position,
    ).toBe(1);
    const auctionAfter1BidBob = await getFirstAuction(bobToken);
    expect(!!auctionAfter1BidBob.bids.find((b) => b.user.id === bob.id)).toBe(
      false,
    );
    expect(auctionAfter1BidBob.currentBid).toBe('101.00');

    await makeBid(auction, aliceToken);
    const auctionAfter2BidAlice = await getFirstAuction(aliceToken);
    expect(auctionAfter2BidAlice.currentBid).toBe('102.00');
    expect(auctionAfter1BidAlice.bids[0].user.id).toBe(alice.id);
    expect(
      auctionAfter1BidAlice.bids.find((b) => b.user.id === alice.id).position,
    ).toBe(1);
    const auctionAfter2BidBob = await getFirstAuction(bobToken);
    expect(
      !!auctionAfter2BidBob.bids.find((b) => b.user.id === bob.id),
    ).toBeFalsy();
    expect(auctionAfter2BidBob.currentBid).toBe('102.00');

    await makeBid(auction, bobToken);
    const auctionAfter3BidsAlice = await getFirstAuction(aliceToken);
    expect(auctionAfter3BidsAlice.currentBid).toBe('103.00');
    expect(auctionAfter3BidsAlice.bids[0].position).toBe(1);
    expect(auctionAfter3BidsAlice.bids[1].position).toBe(2);
    expect(auctionAfter3BidsAlice.bids[0].user.username).toBe('Bob');
    expect(auctionAfter3BidsAlice.bids[1].user.username).toBe('Alice');
    expect(
      auctionAfter3BidsAlice.bids.find((b) => b.user.id === alice.id).position,
    ).toBe(2);

    for (let i = 0; i < 50; i++) {
      const [, randomUserToken] = await createRandomUser(300);
      await makeBid(auction, randomUserToken);
    }

    await makeBid(auction, aliceToken);
    const auctionAfter50BidsAlice = await getFirstAuction(aliceToken);
    const auctionAfter50BidsBob = await getFirstAuction(bobToken);
    expect(auctionAfter50BidsAlice.bids.length).toBe(52);
    expect(auctionAfter50BidsAlice.bids[0].position).toBe(1);
    expect(auctionAfter50BidsAlice.bids[0].user.username).toBe('Alice');
    const npcBids = auctionAfter50BidsAlice.bids.slice(1, -1);
    expect(npcBids.every((x) => !x.user.username)).toBeTruthy();
    expect(
      auctionAfter50BidsAlice.bids.find((b) => b.user.id === alice.id).position,
    ).toBe(1);

    expect(auctionAfter50BidsBob.bids.length).toBe(52);
    expect(auctionAfter50BidsBob.bids[0].user.username).toBe('Alice');
    expect(auctionAfter50BidsBob.bids[51].user.username).toBe('Bob');
    expect(auctionAfter50BidsBob.bids[10].position).toBe(11);
    expect(
      auctionAfter50BidsBob.bids.findIndex((b) => b.user.id === bob.id),
    ).toBe(51);
  });

  it('should dispatch socket events', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    const spy = jest.spyOn(pubsub, 'publish');

    await makeBid(auction, aliceToken);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenNthCalledWith(1, 'BALANCE_CHANGED', {
      balanceChanged: expect.objectContaining({
        balance: '299.00',
        id: alice.id,
      }),
    });

    for (let i = 0; i < 50; i++) {
      await makeBid(auction, aliceToken);
    }
    // await wait(200);
    // Debounce disabled because it randomly break the other tests
    // expect(spy).toHaveBeenNthCalledWith(
    //   52,
    //   'AUCTION_UPDATED',
    //   expect.objectContaining({
    //     auctionUpdated: expect.objectContaining({
    //       id: auction.id,
    //       currentBid: '151.00',
    //     }),
    //   }),
    // );
  });

  it("should not change expiry time if it's past max limit", async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(+new Date(initialExpiry)).toEqual(+new Date(updatedExpiry));
  });

  it('should increase expiry time by 5 to 12 seconds when expiry is less then 5 seconds', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction({
      expiresAt: new Date(Date.now() + 5_000),
    });
    const { expiresAt: initialExpiry } = await getFirstAuction(aliceToken);
    await wait(100);
    const { expiresAt: initialExpiry2 } = await getFirstAuction(aliceToken);
    expect(initialExpiry2).toBe(initialExpiry2);
    await makeBid(auction, aliceToken);
    const { expiresAt: updatedExpiry } = await getFirstAuction(aliceToken);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeGreaterThanOrEqual(5_000);
    expect(
      +new Date(updatedExpiry) - +new Date(initialExpiry),
    ).toBeLessThanOrEqual(12_000);
  });

  it('should not bid on expired auctions', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const [, bobToken] = await createBob(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    expect((await getFirstAuction(aliceToken)).bids[0].user.id).toBe(alice.id);
    await expireAuction(auction.id);
    const {
      body: { errors },
    } = await makeBid(auction, bobToken);
    expect(errors[0].message).toBe('Auction expired');
    const expiredAuction = await getFirstAuction(bobToken);
    expect(expiredAuction.bids.length).toBe(1);
    expect(expiredAuction.bids[0].user.username).toBe(alice.username);
  });

  // it('should not bid if cybavo transfer fails', async () => {
  //   const [, aliceToken] = await createAlice(300);
  //   const auction = await createAuction();
  //   mock['handlers' as any].post[0] = mock
  //     .onPost('/transfer/internal')
  //     // No transaction id
  //     .reply(200, {});
  //   const {
  //     body: { errors },
  //   } = await makeBid(auction, aliceToken);
  //   expect(errors[0].message).toBe('Could not create a bid');
  // });

  it('should not bid if auction not started', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const [, bobToken] = await createBob(300);
    const auction = await createAuction({
      startDate: new Date(Date.now() + 1000),
    });
    const {
      body: { errors },
    } = await makeBid(auction, bobToken);
    expect(errors[0].message).toBe('Auction is not active yet');

    await startAuction(auction.id);
    await makeBid(auction, aliceToken);
    const startedAuction = await getFirstAuction(bobToken);
    expect(startedAuction.bids.length).toBe(1);
    expect(startedAuction.bids[0].user.username).toBe(alice.username);
  });

  it('should not return unannounced auctions', async () => {
    const [, aliceToken] = await createAlice();
    await createAuction({
      announcementDate: new Date(Date.now() + 1000),
    });

    const auctions = await getAuctions(aliceToken);
    expect(auctions.length).toBe(0);
  });

  it('should return unannounced auctions when bypassing', async () => {
    const [, aliceToken] = await createAlice();
    await createAuction({
      announcementDate: new Date(Date.now() + 1000),
    });

    const auctions = await getAuctions(aliceToken, true);
    expect(auctions.length).toBe(1);
  });

  it('should return auctions when announced', async () => {
    const [, aliceToken] = await createAlice();
    await createAuction({
      announcementDate: new Date(Date.now() - 1000),
    });

    const auctions = await getAuctions(aliceToken);
    expect(auctions.length).toBe(1);
  });

  it('should not return private auctions', async () => {
    const [, aliceToken] = await createAlice();
    await createAuction({
      privateCode: 'aa',
    });

    const auctions = await getAuctions(aliceToken);
    expect(auctions.length).toBe(0);

    const auctions2 = await getAuctions(aliceToken, false, 'bb');
    expect(auctions2.length).toBe(0);
  });

  it('should return private auctions if bypassing', async () => {
    const [, aliceToken] = await createAlice();
    await createAuction({
      privateCode: 'aa',
    });

    const auctions = await getAuctions(aliceToken, false, 'aa');
    expect(auctions.length).toBe(1);
  });

  describe('permissions check', () => {
    it('should not allow editing if not admin', async () => {
      const [, aliceToken] = await createAlice();
      const auction = await createAuction({
        title: 'aa',
      });

      const { body } = await updateAuction(aliceToken, {
        ...auction,
        id: auction.id,
        title: 'bbb',
      });

      const auctions = await getAuctions(aliceToken, false);
      expect(auctions[0].title).toBe('aa');
      expect(body.errors[0].message).toBe('Not authorized');
    });
  });

  describe('admin', () => {
    it('should be able to update auction', async () => {
      const [, userToken] = await createRandomUser(0, { isAdmin: true });
      const auction = await createAuction({
        title: 'aa',
      });

      await updateAuction(userToken, {
        ...auction,
        id: auction.id,
        title: 'bbb',
      });

      const auctions = await getAuctions(userToken, false);
      expect(auctions[0].title).toBe('bbb');
    });

    it('should be able to update auction title if started', async () => {
      const [, userToken] = await createRandomUser(0, { isAdmin: true });
      const auction = await createAuction({
        startDate: new Date(Date.now() - 1000),
      });

      await updateAuction(userToken, {
        ...auction,
        id: auction.id,
        title: 'bbb',
      });

      const auctions = await getAuctions(userToken, false);
      expect(auctions[0].title).toBe('bbb');
    });

    it('should not be able to update auction dates if started', async () => {
      const [, userToken] = await createRandomUser(0, { isAdmin: true });
      const auction = await createAuction({
        startDate: new Date(Date.now() - 1000),
      });

      await updateAuction(userToken, {
        ...auction,
        id: auction.id,
        startDate: new Date(Date.now() + 1000),
      });

      const auctions = await getAuctions(userToken, true);
      expect(auctions[0].startDate).toBe(auction.startDate.toISOString());
    });

    it('should be able to delete auction', async () => {
      const [, userToken] = await createRandomUser(0, { isAdmin: true });
      const auction = await createAuction({
        startDate: new Date(Date.now() + 1000),
      });

      await deleteAuction(userToken, auction.id);

      const auctions = await getAuctions(userToken, true);
      expect(auctions.length).toBe(0);
    });

    it('should not be able to delete started auction', async () => {
      const [, userToken] = await createRandomUser(0, { isAdmin: true });
      const auction = await createAuction({
        startDate: new Date(Date.now() - 1000),
      });

      const { body } = await deleteAuction(userToken, auction.id);
      expect(body.errors[0].message).toBe(
        'Cannot delete auction already started',
      );

      const auctions = await getAuctions(userToken, true);
      expect(auctions.length).toBe(1);
    });
  });
});
