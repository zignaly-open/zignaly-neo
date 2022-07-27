import * as payout from '../../../entities/auctions/functions/performPayout';
import {
  claimAuction,
  createAlice,
  createAuction,
  createRandomUser,
  expireAuction,
  getBalance,
  getFirstAuction,
  giveMoney,
  makeBid,
} from '../../helpers/mocks';
import {
  clearMocks,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../helpers/operation';

describe('Auction Claims', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(clearMocks);

  it('should let claim auctions and send information to the ui', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300);
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
    expect(await getBalance(aliceToken)).toBe('199');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not let claim unwon auctions', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300);
    await makeBid(auction, aliceToken);
    expect(await getBalance(aliceToken)).toBe('299');

    for (let i = 0; i < 10; i++) {
      const [randomUser, randomUserToken] = await createRandomUser();
      await giveMoney(randomUser, 10);
      await makeBid(auction, randomUserToken);
    }

    await expireAuction(auction.id);

    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);

    expect(errors.length).toBe(1);
    const claimedAuction = await getFirstAuction(aliceToken);
    expect(claimedAuction.userBid.isClaimed).toBe(false);
    expect(await getBalance(aliceToken)).toBe('299');

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not let claim multiple times', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300);
    await makeBid(auction, aliceToken);
    await expireAuction(auction.id);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toBe('199');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not let claim unfinished auctions', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 300);
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toBe('299');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not let claim auctions after max claim', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    auction.maxClaimDate = new Date(Date.now() - 1);
    await auction.save();
    await giveMoney(alice, 300);
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toBe('299');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not let claim without enough money', async () => {
    const spy = jest.spyOn(payout, 'default');
    const [alice, aliceToken] = await createAlice();
    const auction = await createAuction();
    await giveMoney(alice, 100);
    await makeBid(auction, aliceToken);
    await claimAuction(auction, aliceToken);
    const {
      body: { errors },
    } = await claimAuction(auction, aliceToken);
    expect(errors.length).toBe(1);
    expect(await getBalance(aliceToken)).toBe('99');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
