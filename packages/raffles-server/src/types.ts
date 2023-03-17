import { generateService as generateServiceAuction } from './entities/auctions';
import { generateService as generateServiceCode } from './entities/codes';
import { generateService as generateServiceSetting } from './entities/settings';
import { generateService as generateServiceUser } from './entities/users';

export type ContextUser = {
  id: number;
  publicAddress: string;
  isAdmin: boolean;
};

type ServiceAuction = ReturnType<typeof generateServiceAuction>;
type ServiceCode = ReturnType<typeof generateServiceCode>;
type ServiceSetting = ReturnType<typeof generateServiceSetting>;
type ServiceUser = ReturnType<typeof generateServiceUser>;

export type ApolloContext = {
  user: ContextUser;
  services: {
    Auction: ServiceAuction;
    Code: ServiceCode;
    Setting: ServiceSetting;
    User: ServiceUser;
  };
};

export type TransactionOperations = {
  internal_type: string;
  amount: number;
  created_at: string;
}[];
export type TransactionBalance = Record<string, { balance: string }>;
export type TransactionTransfer = { transaction_id: string };

export enum TransactionType {
  Deposit = 'ZigBids Deposit',
  Fee = 'ZigBids Fee',
  Payout = 'ZigBids Claim',
  RedeemCode = 'ZigBids Redeem Code',
  ReferralCode = 'ZigBids Referral Code',
  Reward = 'ZigBids Email Verify Reward',
}

export type RedisAuctionData = {
  price: string;
  expire: Date;
  ranking: { id: number; username: string }[];
};

export type ResourceOptions = {
  sortField: string;
  sortOrder: 'desc' | 'asc';
  page: number;
  perPage: number;
  filter: { [key: string]: string | number };
};

export type TokenPayload = {
  userId: number;
  email: string;
};
declare global {
  // eslint-disable-next-line no-var
  var redisServer: any;
}
