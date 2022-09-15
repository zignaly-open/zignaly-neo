import '../..';
import {
  changeDiscordName,
  changeUsername,
  checkUsername,
  createAlice,
  createAlicesDiscord,
  createBob,
  createBobDiscord,
  waitUntilTablesAreCreated,
  wipeOut,
} from '../../util/test-utils';

import { User } from './model';

describe('User', () => {
  beforeAll(waitUntilTablesAreCreated);
  beforeEach(wipeOut);

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
});
