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
  Deposit = 'Raffle Deposit',
  Fee = 'Raffle Fee',
  Payout = 'Raffle Payout',
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
