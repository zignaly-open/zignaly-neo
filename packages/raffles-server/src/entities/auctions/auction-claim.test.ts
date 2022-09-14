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
} from '../../util/test-utils';
import { mock } from '../../util/mock-cybavo-wallet';
import { getUserBalance } from '../../cybavo';

describe('Auction Claims', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(clearMocks);
  afterEach(() => {
    mock.reset();
  });

  it('should let claim auctions and send information to the ui', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();

    await makeBid(auction, aliceToken);

    await expireAuction(auction.id);
    const notClaimedAuction = await getFirstAuction(aliceToken);
    expect(notClaimedAuction.userBid.isClaimed).toBe(false);

    const {
      body: {
        data: { claim },
      },
    } = await claimAuction(auction, aliceToken);

    expect(claim.userBid.isClaimed).toBe(true);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.userBid.isClaimed).toBe(true);
    expect(await getUserBalance(alice.publicAddress)).toBe('198');
  });

  it('should make all winners pay final bid price', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const [bob, bobToken] = await createBob(300);
    const auction = await createAuction();

    await makeBid(auction, aliceToken);
    await makeBid(auction, bobToken);

    await expireAuction(auction.id);
    const notClaimedAuction = await getFirstAuction(aliceToken);
    expect(notClaimedAuction.userBid.isClaimed).toBe(false);

    const {
      body: {
        data: { claim },
      },
    } = await claimAuction(auction, aliceToken);

    expect(claim.userBid.isClaimed).toBe(true);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.userBid.isClaimed).toBe(true);
    expect(await getUserBalance(alice.publicAddress)).toBe('197');

    await claimAuction(auction, bobToken);
    expect(await getUserBalance(bob.publicAddress)).toBe('197');
  });

  it('should not let claim unwon auctions', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    expect(await getUserBalance(alice.publicAddress)).toBe('299');

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
    expect(claimedAuction.userBid.isClaimed).toBe(false);
    expect(await getUserBalance(alice.publicAddress)).toBe('299');
  });

  it('should not let claim multiple times', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await expireAuction(auction.id);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getUserBalance(alice.publicAddress)).toBe('198');
  });

  it('should not let claim unfinished auctions', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getUserBalance(alice.publicAddress)).toBe('299');
  });

  it('should not let claim auctions after max claim', async () => {
    const [alice, aliceToken] = await createAlice(300);
    const auction = await createAuction();
    auction.maxClaimDate = new Date(Date.now() - 1);
    await auction.save();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getUserBalance(alice.publicAddress)).toBe('299');
  });

  it('should not let claim without enough money', async () => {
    const [alice, aliceToken] = await createAlice(100);
    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getUserBalance(alice.publicAddress)).toBe('99');
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
