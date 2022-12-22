export type UserBalanceZhits = {
  walletAddress: string;
  zhits: string;
};

export type ContextBalance = {
  id?: number;
  walletAddress: string;
  blockchain: string;
  currency: string;
  transactionType?: string;
  amount: string;
  note?: string;
  zhits: number;
  fromAddressWallet?: string;
  toAddressWallet?: string;
  locked?: boolean;
};

export type DepositParams = {
  walletAddress: string;
  amount: string;
  currency: string;
  blockchain: string;
};
