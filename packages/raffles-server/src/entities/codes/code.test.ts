import { zignalySystemId } from '../../../config';
import redisService from '../../redisService';
import { TransactionType } from '../../types';
import { mock } from '../../util/mock-cybavo-wallet';
import {
  checkCode,
  clearMocks,
  createAlice,
  createAuction,
  createBob,
  createCode,
  createRandomUser,
  expireAuction,
  makeBid,
  redeemCode,
  userCodes,
  userCodesRedemptions,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../util/test-utils';
import { DEFAULT_BENEFIT_DIRECT, DEFAULT_MAX_TOTAL_REWARDS } from './constants';

describe('Codes', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterEach(() => {
    mock.reset();
    clearMocks();
  });
  afterAll(async () => {
    await redisService.redis.quit();
  });

  // it('should handle not found code', async () => {
  //   const [, token] = await createRandomUser(1000, {
  //     referralCode: 'TEST',
  //   });
  //   const { body } = await checkCode('TESTTT', token);
  //   console.log(body);
  //   // expect(res).toEqual(expect.objectContaining({ name: 'TEST' }));
  // });

  it('should handle own code check', async () => {
    const [user, token] = await createRandomUser(1000);
    const { body } = await checkCode(user.codes[0].code, token);
    expect(body.errors[0].message).toEqual('Not allowed');
  });

  it('should return code data', async () => {
    const code = await createCode();
    const [, aliceToken] = await createAlice(1000);

    const {
      body: {
        data: { checkCode: res },
      },
    } = await checkCode(code.code, aliceToken);
    expect(res).toEqual(
      expect.objectContaining({
        code: code.code,
        benefitDirect: expect.any(Number),
      }),
    );
  });

  it('should error if already redeemed a welcome code', async () => {
    const code = await createCode({ welcomeType: true });
    const [user] = await createRandomUser(1000);
    const [, aliceToken] = await createAlice(1000);

    // Redeem welcome code
    await redeemCode(code.code, aliceToken);

    // Redeem another welcome code
    const { body } = await redeemCode(user.codes[0].code, aliceToken);

    expect(body.errors[0].message).toEqual(
      'You have already redeemed a welcome code.',
    );
  });

  it('should error if maxRedemptions reached', async () => {
    const code = await createCode({ maxRedemptions: 1 });
    const [, aliceToken] = await createAlice(1000);
    const [, bobToken] = await createBob(1000);

    // Redeem code
    await redeemCode(code.code, aliceToken);

    // Another user try to redeem code
    const { body } = await redeemCode(code.code, bobToken);

    expect(body.errors[0].message).toEqual('Maximum redemptions reached');
  });

  it('should error if not started yet', async () => {
    const code = await createCode({
      startDate: new Date(Date.now() + 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `The code will start working on ${code.startDate}`,
    );
  });

  it('should error if expired', async () => {
    const code = await createCode({
      endDate: new Date(Date.now() - 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual('The code is expired');
  });

  it('should error if reqMinimumBalance not reached', async () => {
    const code = await createCode({ reqMinimumBalance: 1000 });
    const [, aliceToken] = await createAlice(100);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need a balance of at least ${code.reqMinimumBalance}.`,
    );
  });

  it('should error if reqMinimumDeposit not reached', async () => {
    const code = await createCode({ reqMinimumDeposit: 1000 });
    const [, aliceToken] = await createAlice(100);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need to deposit at least ${code.reqMinimumDeposit}ZIGs.`,
    );
  });

  it('should work if reqMinimumDeposit reached', async () => {
    const code = await createCode({ reqMinimumDeposit: 100 });
    const [, aliceToken] = await createAlice(100);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.data.checkCode).toEqual(
      expect.objectContaining({ name: code.code }),
    );
  });

  it('should error if reqMinAuctions not reached', async () => {
    const code = await createCode({ reqMinAuctions: 1 });
    const [, aliceToken] = await createAlice(100);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need to participate in at least ${code.reqMinAuctions} auctions.`,
    );
  });

  it('should work if reqMinAuctions reached', async () => {
    const code = await createCode({ reqMinAuctions: 1 });
    const [, aliceToken] = await createAlice(100);

    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await expireAuction(auction.id);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.data.checkCode).toEqual(
      expect.objectContaining({ name: code.code }),
    );
  });

  it('should error if reqWalletType not equal', async () => {
    const code = await createCode({ reqWalletType: 'kucoin' });
    const [, aliceToken] = await createRandomUser(100, {
      walletType: 'metamask',
    });

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need a ${code.reqWalletType} wallet.`,
    );
  });

  it('should work if reqWalletType matches', async () => {
    const code = await createCode({ reqWalletType: 'kucoin' });
    const [, aliceToken] = await createRandomUser(100, {
      walletType: 'kucoin',
    });

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.data.checkCode).toEqual(
      expect.objectContaining({ name: code.code }),
    );
  });

  it('should transfer to both users', async () => {
    const [alice] = await createAlice(1000);
    const [bob, bobToken] = await createBob(1000);

    // Mock deposit
    mock.onGet(`/operations/all/${bob.publicAddress}`).reply(() => {
      return [
        200,
        [
          {
            amount: 500,
            created_at: '2022-09-09T16:09:56',
            internal_type: TransactionType.Deposit,
          },
        ],
      ];
    });

    const { body } = await redeemCode(alice.codes[0].code, bobToken);

    expect(body.data.redeemCode).toEqual(DEFAULT_BENEFIT_DIRECT);

    expect(mock.history.post[0].data).toBe(
      JSON.stringify({
        amount: DEFAULT_BENEFIT_DIRECT.toString(),
        fees: '0',
        currency: 'ZIG',
        user_id: zignalySystemId,
        to_user_id: bob.publicAddress,
        locked: 'true',
        type: TransactionType.RedeemCode,
      }),
    );

    expect(mock.history.post[1].data).toBe(
      JSON.stringify({
        amount: DEFAULT_MAX_TOTAL_REWARDS.toString(),
        fees: '0',
        currency: 'ZIG',
        user_id: zignalySystemId,
        to_user_id: alice.publicAddress,
        locked: 'true',
        type: TransactionType.ReferralCode,
      }),
    );
  });

  it('should apply benefitBalanceFactor', async () => {
    const code = await createCode({
      benefitDirect: 100,
      benefitBalanceFactor: 0.5,
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.data.redeemCode).toEqual(600);
  });

  it('should apply benefitDepositFactor', async () => {
    const [bob] = await createBob(1000);
    const code = await createCode({
      benefitDirect: 100,
      benefitDepositFactor: 0.1,
      reqDepositFrom: new Date(Date.now() - 24 * 60 * 60 * 1000),
      rewardDirect: 100,
      rewardFactor: 0.2,
      userId: bob.id,
    });
    const [alice, aliceToken] = await createAlice(1000);

    // Mock deposits
    mock.onGet(`/operations/all/${alice.publicAddress}`).reply(() => {
      return [
        200,
        [
          {
            amount: 500,
            created_at: '2022-09-09T16:09:56',
            internal_type: TransactionType.Deposit,
          },
          {
            amount: 500,
            created_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
            internal_type: TransactionType.Deposit,
          },
        ],
      ];
    });

    const { body } = await redeemCode(code.code, aliceToken);
    expect(body.data.redeemCode).toEqual(150);

    // Check inviterBenefit
    expect(mock.history.post[1].data).toBe(
      JSON.stringify({
        // 100 + 150*0.2
        amount: '130',
        fees: '0',
        currency: 'ZIG',
        user_id: zignalySystemId,
        to_user_id: bob.publicAddress,
        locked: 'true',
        type: TransactionType.ReferralCode,
      }),
    );
  });

  it('should apply benefitDepositFactor up to maxTotalBenefits', async () => {
    const [bob] = await createBob(1000);
    const code = await createCode({
      benefitDirect: 100,
      benefitBalanceFactor: 0.5,
      rewardDirect: 100,
      rewardFactor: 0.2,
      userId: bob.id,
      maxTotalBenefits: 120,
      maxTotalRewards: 110,
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);
    expect(body.data.redeemCode).toEqual(120);

    // Check inviterBenefit
    expect(mock.history.post[1].data).toBe(
      JSON.stringify({
        amount: '110',
        fees: '0',
        currency: 'ZIG',
        user_id: zignalySystemId,
        to_user_id: bob.publicAddress,
        locked: 'true',
        type: TransactionType.ReferralCode,
      }),
    );
  });

  it('should return user code', async () => {
    const [alice, aliceToken] = await createAlice(100);
    const { body } = await userCodes(aliceToken);
    expect(body.data.userCodes).toHaveLength(1);
    expect(body.data.userCodes).toEqual([{ name: alice.codes[0].code }]);
  });

  it('should return code redemptions', async () => {
    const [alice, aliceToken] = await createAlice(1000);
    const [bob, bobToken] = await createBob(1000);
    await redeemCode(alice.codes[0].code, bobToken);
    const { body } = await userCodesRedemptions(aliceToken);
    expect(body.data.userCodesRedemptions).toHaveLength(1);
    expect(body.data.userCodesRedemptions).toEqual([
      expect.objectContaining({
        code: alice.codes[0].code,
        inviterBenefit: expect.any(Number),
        invitedBenefit: expect.any(Number),
        redemptionDate: expect.any(String),
        invited: {
          shortAddress: expect.any(String),
          username: bob.username,
        },
      }),
    ]);
  });
});
