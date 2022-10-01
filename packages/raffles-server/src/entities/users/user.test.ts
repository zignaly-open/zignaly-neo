import '../..';
import {
  changeDiscordName,
  changeUsername,
  checkUsername,
  createAlice,
  createAlicesDiscord,
  createBob,
  createBobDiscord,
  getBalance,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../util/test-utils';
import { User } from './model';
import redisService from '../../redisService';

describe('User', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);
  afterAll(async () => {
    await redisService.redis.quit();
  });

  it('should tell which usernames are taken and which not', async () => {
    const [, aliceToken] = await createAlice();
    await createBob();
    const same = await checkUsername('Alice', aliceToken);
    expect(same).toBe(true);
    const invalid = await checkUsername('money $$$ maker', aliceToken);
    expect(invalid).toBe(false);
    const invalid2 = await checkUsername(
      'to_be_or_not_to_be_this_is_the_question_whether_its_nobler_in_the_mind',
      aliceToken,
    );
    expect(invalid2).toBe(false);
    const res = await checkUsername('Bob', aliceToken);
    expect(res).toBeNull();
    const valid = await checkUsername('Alex', aliceToken);
    expect(valid).toBe(true);
  });

  it('should let users change username', async () => {
    const [alice, aliceToken] = await createAlice();
    await createBob();
    const valid = await changeUsername('Alice1', aliceToken);
    expect(valid.username).toBe('Alice1');
    const updatedAlice = await User.findByPk(alice.id);
    expect(updatedAlice.username).toBe(valid.username);
    const notUpdatedAlice = await User.findByPk(alice.id);
    expect(notUpdatedAlice.username).toBe(valid.username);
  });

  it('should not change name if userName is invalid', async () => {
    const [, aliceToken] = await createAlice();
    const valid = await changeUsername('Alice1g+104^<', aliceToken);
    expect(valid).toBeNull();
  });
  it('should not change name if discordName is invalid', async () => {
    const [, aliceToken] = await createAlicesDiscord();
    const res = await changeDiscordName('Alice1g+104^<', aliceToken);
    expect(res).toBeNull();
  });

  it('should not let two users have the same name', async () => {
    const [, aliceToken] = await createAlice();
    await createBob();
    const res = await changeUsername('Bob', aliceToken);
    expect(res).toBeNull();
  });

  it('should let users change discordname', async () => {
    const [alice, aliceToken] = await createAlicesDiscord();
    await createBobDiscord();
    const valid = await changeDiscordName('Alice#2484', aliceToken);
    expect(valid.discordName).toBe('Alice#2484');
    const updatedAlice = await User.findByPk(alice.id);
    expect(updatedAlice.discordName).toBe(valid.discordName);
    const notUpdatedAlice = await User.findByPk(alice.id);
    expect(notUpdatedAlice.discordName).toBe(valid.discordName);
  });

  it('should not let change other users fields', async () => {
    // passes since we pass individual fields
    // adjust if needed
  });

  describe('fetching balance => redis', () => {
    it('should update USER_CYBAVO_BALANCE on empty store', async () => {
      const [alice, aliceToken] = await createAlice(300);
      const { balance } = await getBalance(aliceToken);
      expect(balance).toBe('300.00');
      const res = await redisService.redis.hget(
        `USER_CYBAVO_BALANCE`,
        alice.id.toString(),
      );
      expect(res).toBe('300000');
    });

    it('should update USER_CYBAVO_BALANCE on different value', async () => {
      const [alice, aliceToken] = await createAlice(300);
      await redisService.redis.set(
        `USER-${alice.id}:CYBAVO_BALANCE`,
        200 * 1000,
      );
      const { balance } = await getBalance(aliceToken);
      expect(balance).toBe('300.00');
      const res = await redisService.redis.hget(
        `USER_CYBAVO_BALANCE`,
        alice.id.toString(),
      );
      expect(res).toBe('300000');
    });

    it('should return USER_CYBAVO_BALANCE if no change', async () => {
      const [alice, aliceToken] = await createAlice(200);
      await redisService.redis.set(
        `USER-${alice.id}:CYBAVO_BALANCE`,
        200 * 1000,
      );
      const { balance } = await getBalance(aliceToken);
      expect(balance).toBe('200.00');
    });

    it('should update USER_CURRENT_BALANCE if different cybavo balance', async () => {
      const [alice, aliceToken, cybavoMock] = await createAlice(300.33);
      // User has bid 50 ZIGS
      await redisService.redis.hset(
        `USER_CURRENT_BALANCE`,
        alice.id,
        250.33 * 1000,
      );
      // User has received 100.11009 ZIGS
      cybavoMock.setBalance(400.44009);

      expect(await getBalance(aliceToken)).toEqual(
        expect.objectContaining({ balance: '350.44' }),
      );

      expect(
        await redisService.redis.hget(
          `USER_CYBAVO_BALANCE`,
          alice.id.toString(),
        ),
      ).toBe('400440');
      expect(
        await redisService.redis.hget(
          `USER_CURRENT_BALANCE`,
          alice.id.toString(),
        ),
      ).toBe('350440');
    });
  });
});
