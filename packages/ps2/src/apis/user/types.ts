export interface UserState {
  accessToken?: string;
  sessionExpiryDate?: Date;
  user?: UserData;
  activeExchangeInternalId?: string;
}

export type UserData = {
  userId: string;
  firstName: string;
  email: string;
  createdAt: string;
  locale: UserLocale;
  intercomHash: string;
  isTrader?: {
    profit_sharing: boolean;
    copy_trading: boolean;
    signal_providers: boolean;
  };
  imageUrl: false | string;
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
  refRewardType: RefRewardType;
  refCode: string;
  wall?: {
    banned: boolean;
  };

  exchanges: Exchange[];
};

// TODO: move somewhere
export type ExchangeType = 'futures' | 'spot';

// TODO: move somewhere
export type Exchange = {
  name: string;
  exchangeId: string;
  exchangeName: string;
  internalId: string;
  internalName: string;
  areKeysValid: boolean;
  paperTrading: boolean;
  exchangeType: ExchangeType;
  isTestnet: boolean;
  disable: boolean;
  balanceSynced: boolean;
  balanceSyncedAt: string;
  checkAuthCount: boolean;
  profitSharingBasket: boolean;
  globalBlacklist: boolean;
  globalDelisting: boolean;
  globalMaxPositions: number;
  globalMinVolume: number;
  globalPositionsPerMarket: number;
  positionSize: number;
  globalWhitelist: boolean;
  isBrokerAccount: boolean;
  activated: boolean;
};

export type SignupResponse = {
  token: string;
  userId: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  newPageAB?: boolean;
  ref?: string;
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

export type LoginFullPayload = LoginPayload & {
  gRecaptchaResponse: string;
  c: number;
};

export type SessionResponse = {
  validUntil: number;
  userId: string;
};

export type UserLocale = string;
export type RefRewardType = 'perpetual';

export enum SessionsTypes {
  Login = 'login',
  Signup = 'signup',
}

export type ExtendedExchange = Exchange & { image: string };
