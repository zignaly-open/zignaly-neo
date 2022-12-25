import { zignalySystemId } from '../../../config';
import redisService from '../../redisService';
import { TransactionType } from '../../types';
import {
  checkCode,
  createAlice,
  createAliceDeposit,
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
import {
  DEFAULT_BENEFIT_DEPOSIT_FACTOR,
  DEFAULT_BENEFIT_DIRECT,
  DEFAULT_MAX_TOTAL_REWARDS,
  DEFAULT_REWARD_DIRECT,
} from './constants';
import { Balance } from '../balances/model';

describe('Codes', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterAll(async () => {
    await redisService.redis.quit();
  });

  it('should handle not found code', async () => {
    const [, token] = await createRandomUser(1000, {});
    const { body } = await checkCode('TESTTT', token);
    expect(body.errors[0].message).toEqual('Code not found.');
  });

  it('should handle own code check', async () => {
    const [user, token] = await createRandomUser(1000);
    const { body } = await checkCode(user.codes[0].code, token);
    expect(body.errors[0].message).toEqual('Not allowed.');
  });

  it('should return code data', async () => {
    const code = await createCode();
    const [, aliceToken] = await createAlice(1000);

    const {
      body: {
        data: { checkCode: res },
      },
    } = await checkCode(code.code, aliceToken);
    expect(res).toEqual({
      code: expect.objectContaining({
        code: code.code,
        benefitDirect: expect.any(Number),
      }),
      balance: 1000,
      deposits: 1000,
    });
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

  it('should error if already redeemed that code', async () => {
    const code = await createCode({ welcomeType: false });
    const [, aliceToken] = await createAlice(1000);

    await redeemCode(code.code, aliceToken);
    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      'You have already redeemed this code.',
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

    expect(body.errors[0].message).toEqual('Maximum redemptions reached.');
  });

  it('should error if not started yet', async () => {
    const code = await createCode({
      startDate: new Date(Date.now() + 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.errors[0].message).toMatch(/The code will start working on \d/);
  });

  it('should error if expired', async () => {
    const code = await createCode({
      endDate: new Date(Date.now() - 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual('The code is expired.');
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
      `You need to deposit at least ${code.reqMinimumDeposit} ZIG.`,
    );
  });

  it('should work if reqMinimumDeposit reached', async () => {
    const code = await createCode({ reqMinimumDeposit: 100 });
    const [, aliceToken] = await createAlice(100);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.data.checkCode.code).toEqual(
      expect.objectContaining({ code: code.code }),
    );
  });

  it('should error if reqMinAuctions not reached', async () => {
    const code = await createCode({ reqMinAuctions: 1 });
    const [, aliceToken] = await createAlice(500);

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need to participate in at least ${code.reqMinAuctions} auctions.`,
    );
  });

  it('should work if reqMinAuctions reached', async () => {
    const code = await createCode({ reqMinAuctions: 1 });
    const [, aliceToken] = await createAlice(501);

    const auction = await createAuction();
    await makeBid(auction, aliceToken);
    await expireAuction(auction.id);

    const { body } = await checkCode(code.code, aliceToken);
    expect(body.data.checkCode.code).toEqual(
      expect.objectContaining({ code: code.code }),
    );
  });

  it('should error if reqWalletType not equal', async () => {
    const code = await createCode({ reqWalletType: 'kucoin' });
    const [, aliceToken] = await createRandomUser(500, {
      walletType: 'metamask',
    });

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.errors[0].message).toEqual(
      `You need a ${code.reqWalletType} wallet.`,
    );
  });

  it('should work if reqWalletType matches', async () => {
    const code = await createCode({ reqWalletType: 'kucoin' });
    const [, aliceToken] = await createRandomUser(500, {
      walletType: 'kucoin',
    });

    const { body } = await checkCode(code.code, aliceToken);

    expect(body.data.checkCode.code).toEqual(
      expect.objectContaining({ code: code.code }),
    );
  });

  it('should transfer rewardDirect', async () => {
    const [alice] = await createAlice(1000);
    const code = await createCode({
      maxTotalRewards: null,
      rewardDirect: 10,
      userId: alice.id,
    });
    const [, bobToken] = await createBob(1000);

    const { body } = await redeemCode(code.code, bobToken);
    expect(body.data.redeemCode).toEqual(code.benefitDirect);

    const response = await Balance.findAll({});
    const expected = {
      walletAddress: alice.publicAddress,
      zhits: '10',
      amount: 0,
      currency: '',
      blockchain: '',
      transactionType: TransactionType.ReferralCode,
      note: '617bab4be4ca6a2937666523',
    };

    expect(expected.walletAddress).toBe(
      response[response.length - 1].walletAddress,
    );

    expect(expected.transactionType).toBe(
      response[response.length - 1].transactionType,
    );

    expect(expected.zhits).toBe(response[response.length - 1].zhits);
  });

  it('should transfer to both users', async () => {
    const [alice] = await createAlice(1000);
    const [bob, bobToken] = await createBob(1000);

    const { body } = await redeemCode(alice.codes[0].code, bobToken);

    expect(body.data.redeemCode).toEqual(
      DEFAULT_BENEFIT_DIRECT + DEFAULT_BENEFIT_DEPOSIT_FACTOR * 1000,
    );

    const [, , response1, response2] = await Balance.findAll({});

    const expected = {
      amount: '5100',
      fees: '0',
      currency: 'ZIG',
      user_id: zignalySystemId,
      to_user_id: bob.publicAddress,
      type: TransactionType.RedeemCode,
    };

    expect(expected.type).toBe(response1.transactionType);
    expect(bob.publicAddress).toBe(response1.walletAddress);

    const expected2 = {
      amount: DEFAULT_MAX_TOTAL_REWARDS.toString(),
      fees: '0',
      currency: 'ZIG',
      user_id: zignalySystemId,
      to_user_id: alice.publicAddress,
      type: TransactionType.ReferralCode,
    };

    expect(expected2.type).toBe(response2.transactionType);
    expect(alice.publicAddress).toBe(response2.walletAddress);
  });

  it('should apply benefitBalanceFactor', async () => {
    const code = await createCode({
      benefitDirect: 100,
      benefitBalanceFactor: 0.5,
      maxTotalBenefits: 1000,
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
      maxTotalBenefits: 200,
      maxTotalRewards: 200,
    });

    const [, aliceToken] = await createAlice(1000);

    await createAliceDeposit(500, '2022-09-09T16:09:56');
    await createAliceDeposit(500, new Date(Date.now() - 12 * 60 * 60 * 1000));

    const { body } = await redeemCode(code.code, aliceToken);
    expect(body.data.redeemCode).toEqual(200);

    const [response1] = await (await Balance.findAll({})).reverse();
    expect(response1.walletAddress).toBe(bob.publicAddress);
    expect(response1.zhits).toBe('140');
    expect(response1.transactionType).toBe(TransactionType.ReferralCode);
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

    const [response1] = await (await Balance.findAll({})).reverse();

    expect(TransactionType.ReferralCode).toBe(response1.transactionType);
    expect(bob.publicAddress).toBe(response1.walletAddress);
    expect('110').toBe(response1.zhits);
  });

  it('should apply rewardDepositFactor', async () => {
    const [bob] = await createBob(1000);
    const code = await createCode({
      userId: bob.id,
      rewardFactor: 0,
      maxTotalRewards: 10000,
      rewardDepositFactor: 0.1,
      benefitBalanceFactor: 0,
      benefitDepositFactor: 0,
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.code, aliceToken);
    expect(body.data.redeemCode).toEqual(DEFAULT_BENEFIT_DIRECT);

    const [response1] = await (await Balance.findAll({})).reverse();

    expect(TransactionType.ReferralCode).toBe(response1.transactionType);
    expect(bob.publicAddress).toBe(response1.walletAddress);
    expect((DEFAULT_REWARD_DIRECT + 100).toString()).toBe(response1.zhits);
  });

  it('should return user code', async () => {
    const [alice, aliceToken] = await createAlice(100);
    const { body } = await userCodes(aliceToken);
    expect(body.data.userCodes).toHaveLength(1);
    expect(body.data.userCodes).toEqual([
      expect.objectContaining({
        code: alice.codes[0].code,
        benefitDirect: expect.any(Number),
        rewardDirect: expect.any(Number),
        currentRedemptions: expect.any(Number),
      }),
    ]);
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
