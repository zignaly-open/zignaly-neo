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

export type TransactionType = 'deposit' | 'withdraw' | 'internal' | 'all';

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

// export const TRANSACTION_TYPE = {
//   DEPOSIT: 'deposit',
//   internal: 'internal',
//   reward: 'reward',
//   successfee: 'successfee',
//   DEPOSIT: 'coinsalvage',
//   DEPOSIT: 'withdraw',
//   DEPOSIT: 'compensation',
//   DEPOSIT: 'payment',
//   DEPOSIT: 'cashbackvolume',
//   DEPOSIT: 'withdrawfee',
//   DEPOSIT: 'zigpadpledge',
//   DEPOSIT: 'zigpadreturn',
//   DEPOSIT: 'zigpadtokensreward',
//   DEPOSIT: 'stakingvault',
//   DEPOSIT: 'stakingvaultreturn',
//   DEPOSIT: 'unstakingvault',
//   DEPOSIT: 'buyzig',
//   DEPOSIT: 'zigbidsredeemcode',
//   DEPOSIT: 'zigbidsreferralcode',
// };

export const enum TransactionStateType {
  COMPLETED = 'SUCCESS',
  PENDING = 'IN_PROGRESS',
  ERROR = 'FAILED',
}
