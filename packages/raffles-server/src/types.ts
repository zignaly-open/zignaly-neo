import { generateService as generateServiceAuction } from './entities/auctions';
import { generateService as generateServiceCode } from './entities/codes';
import { generateService as generateServiceSetting } from './entities/settings';
import { generateService as generateServiceUser } from './entities/users';
import { generateService as generateServiceBalance } from './entities/balances';

export type ContextUser = {
  id: number;
  publicAddress: string;
  isAdmin: boolean;
};

export type ContextBalance = {
  id?: number;
  walletAddress: string;
  blockchain: string;
  currency: string;
  transactionType?: string;
  amount: number;
  note?: string;
  zhits: number;
  fromAddressWallet?: string;
  toAddressWallet?: string;
};

type ServiceAuction = ReturnType<typeof generateServiceAuction>;
type ServiceCode = ReturnType<typeof generateServiceCode>;
type ServiceSetting = ReturnType<typeof generateServiceSetting>;
type ServiceUser = ReturnType<typeof generateServiceUser>;
type ServiceBalance = ReturnType<typeof generateServiceBalance>;

export type ApolloContext = {
  user: ContextUser;
  services: {
    Auction: ServiceAuction;
    Code: ServiceCode;
    Setting: ServiceSetting;
    User: ServiceUser;
    Balance: ServiceBalance;
  };
};

export type CybavoOperations = {
  internal_type: string;
  amount: number;
  created_at: string;
}[];
export type CybavoBalance = Record<string, { balance: string }>;
export type CybavoTransfer = { transaction_id: string };

export enum TransactionType {
  Deposit = 'ZigBids Deposit',
  Fee = 'ZigBids Fee',
  Payout = 'ZigBids Claim',
  RedeemCode = 'ZigBids Redeem Code',
  ReferralCode = 'ZigBids Referral Code',
}

export type RedisAuctionData = {
  price: string;
  expire: Date;
  ranking: number[];
};

export type ResourceOptions = {
  sortField: string;
  sortOrder: 'desc' | 'asc';
  page: number;
  perPage: number;
  filter: { [key: string]: string | number };
};

declare global {
  // eslint-disable-next-line no-var
  var redisServer: any;
}
