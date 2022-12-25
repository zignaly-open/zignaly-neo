import { TransactionType } from '../../types';

export type UserBalanceZhits = string;

export enum Import {
  Import = 'import',
}

export type BalanceType = {
  walletAddress: string;
  zhits: string;
  blockchain?: string;
  amount?: string;
  currency?: string;
  transactionType: TransactionType | Import;
  note?: string;
};

export type DepositParams = {
  walletAddress: string;
  amount: string;
  currency: string;
  blockchain: string;
  note?: string;
};

export type RedeemParams = {
  walletAddress: string;
  zhits: string;
  note: string;
};

export type FeeParams = {
  walletAddress: string;
  zhits: string;
  note: string;
};

export type ReferralParams = {
  walletAddress: string;
  zhits: string;
  note: string;
};

export type PayoutParams = {
  walletAddress: string;
  zhits: string;
  note: string;
};

// this is for importing data from cybavo
export type ImportParams = {
  walletAddress: string;
  zhits: string;
};

export type ImportBalanceZhits = {
  zhits: string;
};
