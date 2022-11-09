import {
  waitUntilTablesAreCreated,
  wipeOut,
  clearMocks,
  createAlice,
  createAuction,
  makeBid,
  expireAuction,
  getFirstAuction,
  claimAuction,
  createRandomUser,
  createBob,
  getBalance,
} from '../../util/test-utils';
import { mock } from '../../util/mock-cybavo-wallet';
import redisService from '../../redisService';

describe('Auction Claims', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(clearMocks);
  afterEach(() => {
    mock.reset();
  });
  afterAll(async () => {
    await redisService.redis.quit();
  });

  it('should let claim auctions and send information to the ui', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();

    await makeBid(auction, aliceToken);

    await expireAuction(auction.id);
    const notClaimedAuction = await getFirstAuction(aliceToken);
    expect(notClaimedAuction.isClaimed).toBe(false);

    const {
      body: {
        data: { claim },
      },
    } = await claimAuction(auction, aliceToken);

    expect(claim.isClaimed).toBe(true);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.isClaimed).toBe(true);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '198.00' }),
    );
  });

  it('should let claim orivate auctions', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction({ privateCode: 'aa' });

    await makeBid(auction, aliceToken);

    await expireAuction(auction.id);
    await getFirstAuction(aliceToken);

    const {
      body: {
        data: { claim },
      },
    } = await claimAuction(auction, aliceToken);

    expect(claim.isClaimed).toBe(true);
  });

  it('should make all winners pay final bid price', async () => {
    const [, aliceToken] = await createAlice(300);
    const [, bobToken] = await createBob(300);
    const auction = await createAuction();

    await makeBid(auction, aliceToken);
    await makeBid(auction, bobToken);

    await expireAuction(auction.id);
    const notClaimedAuction = await getFirstAuction(aliceToken);
    expect(notClaimedAuction.isClaimed).toBe(false);

    const {
      body: {
        data: { claim },
      },
    } = await claimAuction(auction, aliceToken);

    expect(claim.isClaimed).toBe(true);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.isClaimed).toBe(true);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '197.00' }),
    );

    await claimAuction(auction, bobToken);
    expect(await getBalance(bobToken)).toEqual(
      expect.objectContaining({ balance: '197.00' }),
    );
  });

  it('should not let claim unwon auctions', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '299.00' }),
    );

    for (let i = 0; i < 10; i++) {
      const [, randomUserToken] = await createRandomUser(10);
      await makeBid(auction, randomUserToken);
    }

    await expireAuction(auction.id);

    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);

    expect(errors.length).toBe(1);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.isClaimed).toBe(false);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '299.00' }),
    );
  });

  it('should not let claim multiple times', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await expireAuction(auction.id);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '198.00' }),
    );
  });

  it('should not let claim unfinished auctions', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '299.00' }),
    );
  });

  it('should not let claim auctions after max claim', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    auction.maxClaimDate = new Date(Date.now() - 1);
    await auction.save();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '299.00' }),
    );
  });

  it('should not let claim without enough money', async () => {
    const [, aliceToken] = await createAlice(100);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toEqual(
      expect.objectContaining({ balance: '99.00' }),
    );
  });

  it('should not claim if cybavo transfer fails', async () => {
    const [, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    mock['handlers' as any].post[0] = mock
      .onPost('/transfer/internal')
      // No transaction id
      .reply(200, {});
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
  });
});
