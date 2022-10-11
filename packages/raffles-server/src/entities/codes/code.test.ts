import { zignalySystemId } from '../../../config';
import redisService from '../../redisService';
import { TransactionType } from '../../types';
import { mock } from '../../util/mock-cybavo-wallet';
import {
  checkCode,
  clearMocks,
  createAlice,
  createBob,
  createCode,
  createRandomUser,
  redeemCode,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../util/test-utils';

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
    const { body } = await checkCode(user.referralCode, token);
    expect(body.errors[0].message).toEqual('Not allowed');
  });

  it('should return code data', async () => {
    const [user] = await createRandomUser(1000);
    const [, aliceToken] = await createAlice(1000);

    const {
      body: {
        data: { checkCode: res },
      },
    } = await checkCode(user.referralCode, aliceToken);
    console.log(res);
    expect(res).toEqual(expect.objectContaining({ name: user.referralCode }));
  });

  it('should error if already redeemed a welcome code', async () => {
    const [user] = await createRandomUser(1000);
    const [user2] = await createRandomUser(1000);
    const [, aliceToken] = await createAlice(1000);

    // Redeem welcome code
    await redeemCode(user.referralCode, aliceToken);

    // Redeem another welcome code
    const { body } = await redeemCode(user2.referralCode, aliceToken);

    expect(body.errors[0].message).toEqual(
      'You have already redeemed a welcome code.',
    );
  });

  it('should error if maxRedemptions reached', async () => {
    const code = await createCode({ maxRedemptions: 1 });
    const [, aliceToken] = await createAlice(1000);
    const [, bobToken] = await createBob(1000);

    // Redeem code
    await redeemCode(code.name, aliceToken);

    // Another user try to redeem code
    const { body } = await redeemCode(code.name, bobToken);

    expect(body.errors[0].message).toEqual('Maximum redemptions reached');
  });

  it('should error if not started yet', async () => {
    const code = await createCode({
      startDate: new Date(Date.now() + 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.name, aliceToken);

    expect(body.errors[0].message).toEqual(
      `The code will start working on ${code.startDate}`,
    );
  });

  it('should error if expired', async () => {
    const code = await createCode({
      endDate: new Date(Date.now() - 1000),
    });
    const [, aliceToken] = await createAlice(1000);

    const { body } = await redeemCode(code.name, aliceToken);

    expect(body.errors[0].message).toEqual('The code is expired');
  });

  it('should error if already redeemed a welcome code', async () => {
    const [user] = await createRandomUser(1000);
    const [user2] = await createRandomUser(1000);
    const [, aliceToken] = await createAlice(1000);

    // Redeem welcome code
    await redeemCode(user.referralCode, aliceToken);

    // Redeem another welcome code
    const { body } = await redeemCode(user2.referralCode, aliceToken);

    expect(body.errors[0].message).toEqual(
      'You have already redeemed a welcome code.',
    );
  });

  it('should transfer to both users', async () => {
    const [alice] = await createAlice(1000);
    const [bob, bobToken] = await createBob(1000);

    const { body } = await redeemCode(alice.referralCode, bobToken);

    expect(body.data.redeemCode).toEqual(500);

    expect(mock.history.post[0].data).toBe(
      JSON.stringify({
        amount: '500',
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
        amount: '100',
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

    const { body } = await redeemCode(code.name, aliceToken);

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
            internal_type: 'ZigBids Deposit',
          },
          {
            amount: 500,
            created_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
            internal_type: 'ZigBids Deposit',
          },
        ],
      ];
    });

    const { body } = await redeemCode(code.name, aliceToken);
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

    const { body } = await redeemCode(code.name, aliceToken);
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
});
