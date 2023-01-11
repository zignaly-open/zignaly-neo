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

// export type TransactionType = 'deposit' | 'withdraw' | 'internal' | 'all';

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
  INTERNAL: 'internal',
  REWARD: 'reward',
  SUCCESS_FEE: 'successfee',
  COIN_SALVAGE: 'coinsalvage',
  WITHDRAW: 'withdraw',
  COMPENSATION: 'compensation',
  PAYMENT: 'payment',
  CASHBACK_VOLUME: 'cashbackvolume',
  WITHDRAW_FEE: 'withdrawfee',
  ZIGPAD_PLEDGE: 'zigpadpledge',
  ZIGPAD_RETURN: 'zigpadreturn',
  ZIGPAD_TOKENS_REWARD: 'zigpadtokensreward',
  STAKING_VAULT: 'stakingvault',
  STAKING_VAULT_RETURN: 'stakingvaultreturn',
  UNSTAKING_VAULT: 'unstakingvault',
  BUY_ZIG: 'buyzig',
};
export type FilterType = keyof typeof FILTERS_TYPE;

export const TRANSACTION_TYPE = {
  ...FILTERS_TYPE,
  ZIGBIDS_REDEEM_CODE: 'zigbidsredeemcode',
  ZIGBIDS_REFERRAL_CODE: 'zigbidsreferralcode',
};
export type TransactionType = keyof typeof TRANSACTION_TYPE;

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
