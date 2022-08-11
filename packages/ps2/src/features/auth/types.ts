export interface AuthState {
  isLoggedIn: boolean;
}

export type LoginResponse = {
  token: string;
  ask2FA: boolean;
  isUnknownDevice: boolean;
  disabled: boolean;
  emailUnconfirmed: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginFullPayload = LoginPayload & {
  gRecaptchaResponse: string;
  cVersionRecaptcha: number;
};
