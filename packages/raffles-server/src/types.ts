import { generateService } from './entities/auctions';

export type ContextUser = {
  id: number;
  publicAddress: string;
  isAdmin: boolean;
};

type Service = ReturnType<typeof generateService>;
export type ApolloContext = {
  user: ContextUser;
  services: { Auctions: Service };
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
