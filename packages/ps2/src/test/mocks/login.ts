import { LoginResponse } from '../../apis/user/types';
import { BackendError } from '../../util/errors';

export const loginMockEmail = 'alex@xfuturum.com';
export const loginMockPassword = 'password';
export const loginResponseMockSuccess: LoginResponse = {
  token: 'string',
  ask2FA: true,
  isUnknownDevice: true,
  disabled: false,
  emailUnconfirmed: false,
};
export const loginResponseMockWrongCredentials: BackendError['data'] = {
  error: { code: 8, msg: 'Wrong credentials' },
};
