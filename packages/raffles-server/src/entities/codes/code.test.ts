import redisService from '../../redisService';
import {
  checkCode,
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
    // mock.reset();
    // clearMocks();
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

  describe('check', () => {
    it('should handle own code check', async () => {
      const [user, token] = await createRandomUser(1000);
      const { body } = await checkCode(user.referralCode, token);
      console.log(body);
      expect(body).toEqual('Not allowed');
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
      // const [user] = await createRandomUser(1000);
      // const [user2] = await createRandomUser(1000);
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
  });
});
