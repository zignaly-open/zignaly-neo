export interface UserState {
  accessToken?: string;
  sessionExpiryDate?: Date;
  user?: UserData;
  activeExchangeInternalId?: string;
}

export enum UserAccessLevel {
  Banned = -100,
  NotVerified = 100,
  KycPending = 350,
  NoSubscription = 375,
  Frozen = 400,
  KycExpired = 450,
  SubscriptionExpired = 475,
  Normal = 500,
  Support = 700,
  Admin = 900,
}

export type UserData = {
  userId: string;
  firstName: string;
  email: string;
  createdAt: string;
  locale: UserLocale;
  accessLevel: UserAccessLevel;
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
  refRewardType: RefRewardType;
  refCode: string;
  bio?: string;
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
  createdAt: string;
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
  subtrack?: string;
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

export type SessionResponse = {
  validUntil: number;
  userId: string;
};

export type KycResponse = {
  status?: 'rejected' | 'pending' | 'approved';
  reason?: string;
  canBeRetried?: boolean;
};

export type KycStatus = {
  category: 'KYC' | 'KYB';
  level: string;
  order: number;
  status: null | string;
};

export type KycLinkResponse = {
  link: string;
};

export type UserLocale = string;
export type RefRewardType = 'perpetual';

export enum SessionsTypes {
  Login = 'login',
  Signup = 'signup',
}

export type ExtendedExchange = Exchange & { image: string };

export type UserBalance = {
  totalFreeBTC: number;
  totalFreeUSDT: number;
  totalLockedBTC: number;
  totalLockedUSDT: number;
  totalPnlBTC: number;
  totalPnlUSDT: number;
  totalWalletBTC: number;
  totalWalletUSDT: number;
  totalUnrealizedProfitBTC: number;
  totalUnrealizedProfitUSDT: number;
  totalMarginBTC: number;
  totalMarginUSDT: number;
};
