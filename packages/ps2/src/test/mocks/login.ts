import { LoginResponse } from '../../apis/user/types';

export const loginResponseMockWrongCredentials: LoginResponse = {
  token: 'string',
  ask2FA: true,
  isUnknownDevice: true,
  disabled: false,
  emailUnconfirmed: false,
};
// export const LoginResponseWrongCredentials: LoginResponse = {
//   error: { code: 8, msg: 'Wrong credentials' },
// };
