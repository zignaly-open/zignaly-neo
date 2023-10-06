import { SubscriptionPlan } from '../subscription/types';

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
  KYCMonitoring: boolean;
  intercomHash: string;
  isTrader?: {
    profit_sharing: boolean;
  };
  imageUrl?: string;
  '2FAEnable': boolean;
  ask2FA: boolean;
  userName: string;
  isSupport: boolean;
  refCode: string;
  country: string;
  about?: string;
  subscriptionFinishesAt?: string;
  subscriptionPlan?: SubscriptionPlan;
  subscriptionDuration?: 'lifetime' | 'year';
  wall?: {
    banned: boolean;
  };
  exchanges: Exchange[];
  // Not used?
  providerEnable?: boolean;
  subscribe?: boolean;
  binanceConnected?: boolean;
  hasActivated?: boolean;
  realExchangeConnected?: boolean;
  demoExchangeConnected?: boolean;
  sellsCount?: number;
  buysCount?: number;
  verified?: boolean;
  tradingFeeDiscount?: boolean;
  payFeeWithZig?: boolean;
  refRewardType?: RefRewardType;
};

// TODO: move somewhere
export type ExchangeType = 'futures' | 'spot';

// TODO: move somewhere
export type Exchange = {
  exchangeId: string;
  exchangeName: string;
  internalId: string;
  internalName: string;
  areKeysValid: boolean;
  exchangeType: ExchangeType;
  disable: boolean;
  checkAuthCount: boolean;
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
  status?: 'rejected' | 'pending' | 'approved' | 'init' | null;
  reason?: string;
  canBeRetried?: boolean;
  category: 'KYC' | 'KYB';
  level: string;
  order: number;
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
