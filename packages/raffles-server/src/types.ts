export type ContextUser = {
  id: number;
  publicAddress: string;
};

export type ApolloContext = {
  user: ContextUser;
};

export type CybavoBalance = Record<string, { balance: string }>;
export type CybavoTransfer = { transaction_id: string };

export enum TransactionType {
  Deposit = 'ZigBids Deposit',
  Fee = 'ZigBids Fee',
  Payout = 'ZigBids Claim',
}

export type RedisAuctionData = {
  price: string;
  expire: Date;
  ranking: number[];
};

declare global {
  // eslint-disable-next-line no-var
  var redisServer: any;
}
