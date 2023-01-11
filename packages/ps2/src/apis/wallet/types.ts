// eslint-disable-next-line @typescript-eslint/ban-types
export type WalletState = {};

export type WalletNetwork = {
  addressRegex: string;
  depositEnable: boolean;
  integerMultiple: string;
  isDefault: boolean;
  memoRegex: string;
  name: string;
  network: string;
  withdrawEnable: boolean;
};

export type WalletCoin = {
  decimals: number;
  name: string;
  networks: WalletNetwork[];
  usdPrice: number;
  allowDeposit: boolean;
};

export type WalletCoins = Record<string, WalletCoin>;

export type WalletBalance = {
  balance: number;
  availableBalance: number;
  /** Locked balance (balance - availableBalance) */
  locked: number;
  staked: number;
  unstaking: number;
};
export type WalletBalances = Record<string, WalletBalance>;

export type TotalSavings = {
  total: number;
};

export type Transaction = {
  amount: string;
  formattedAmount: string;
  createdAt: string;
  currency: string;
  fees: string;
  fromAddress: string;
  fromName: string;
  toAddress: string;
  toName: string;
  providerId: string;
  providerName: string;
  transactionId: string;
  note: string;
  txUrl: string;
  network: string;
  networkName: string;
  status: TransactionStateType;
  type: string;
  zigpadName: string;
  zigpadId: string;
  zigpadLogo: string;
};
export type Transactions = Transaction[];

export const FILTERS_TYPE = {
  ALL: 'all',
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  CASHBACK_VOLUME: 'cashback_volume',
  COIN_SALVAGE: 'coin_salvage',
  COMPENSATION: 'compensation',
  PAYMENT: 'payment',
  REWARD: 'reward',
  SUCCESS_FEE: 'success_fee',
  WITHDRAW_FEE: 'withdraw_fee',
  ZIGPAD_PLEDGE: 'zigpad_pledge',
  ZIGPAD_RETURN: 'zigpad_return',
  ZIGPAD_REWARD: 'zigpad_reward',
  STAKING_VAULT: 'staking_vault',
  STAKING_VAULT_RETURN: 'staking_vault_return',
  UNSTAKING_VAULT: 'unstaking_vault',
  BUY_ZIG: 'buy_zig',
};
export type FilterKeys = keyof typeof FILTERS_TYPE;
export type FilterValues = typeof FILTERS_TYPE[FilterKeys];

export const enum TransactionStateType {
  COMPLETED = 'SUCCESS',
  PENDING = 'IN_PROGRESS',
  ERROR = 'FAILED',
}

export type DepositInfo = {
  address: string;
  currency: string;
  memo: string;
};

export type PriceInfo = {
  key: string;
  price: string;
  expiration: number;
  maxAmount: string;
  minAmount: string;
  timeForMax: number;
};

export type WithdrawFeeInfo = {
  floatFee: string;
  expiration: number;
  key: string;
  feeCurrency: string;
};
