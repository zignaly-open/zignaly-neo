import { ImportMock } from 'ts-mock-imports';
import * as config from '../../../config';
import { User } from '../../../src/entities/users/model';
import {
  authenticateSignature,
  signJwtToken,
} from '../../../src/entities/users/util';

const secret = 'razrazrazetohardbass';
const signature =
  '0x087378ba073f20a13123b195f134164d918af35f585fdd9efd3ed7a81f8228f67ff7ddf2b7be7c65a4a7e5d369d4d9921b097ae4b087b15acac5b39f099f1fc61b';
const algorithm = 'HS256';

ImportMock.mockOther(config, 'secret', secret);
ImportMock.mockOther(config, 'algorithm', algorithm);

const mockedUser = {
  id: 5,
  publicAddress: '0xe288ae3acccc630781354da2aa64379a0d4c56db',
  nonce: 5543,
  save: () => {
    // Do nothing
  },
} as User;

jest
  .spyOn(User, 'findOne')
  .mockImplementation(() => Promise.resolve<User>(mockedUser));

describe('Basic', () => {
  it('should work', async () => {
    const accessToken = await authenticateSignature(
      signature,
      mockedUser.publicAddress,
      (nonce) => `I am signing my one-time nonce: ${nonce}`,
    );
    expect(accessToken).toBe(await signJwtToken(mockedUser));
  });
});
