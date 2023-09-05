export interface UserState {
  accessToken?: string;
  user?: UserData;
}

export type UserData = {
  userId: string;
  firstName: string;
  email: string;
  createdAt: string;
  KYCMonitoring: boolean;
  intercomHash: string;
  isTrader?: {
    profit_sharing: boolean;
    copy_trading: boolean;
    signal_providers: boolean;
  };
  imageUrl?: string;
  providerEnable: boolean;
  '2FAEnable': boolean;
  ask2FA: boolean;
  userName: string;
  subscribe: boolean;
  binanceConnected: boolean;
  hasActivated: boolean;
  realExchangeConnected: boolean;
  demoExchangeConnected: boolean;
  isSupport: boolean;
  sellsCount: number;
  buysCount: number;
  verified: boolean;
  tradingFeeDiscount: boolean;
  payFeeWithZig: boolean;
  refCode: string;
  country: string;
  about?: string;
  subscriptionFinishesAt?: string;
  subscriptionDuration?: 'lifetime' | 'year';
  wall?: {
    banned: boolean;
  };
};

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
