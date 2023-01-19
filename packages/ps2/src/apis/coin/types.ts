import { InfiniteQueryResponse } from 'util/hooks/useInfinitePaginatedQuery';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CoinState = {};

export type CoinBalance = {
  balanceFree: string;
  balanceFreeBTC: string;
  balanceFreeUSDT: string;
  balanceLocked: string;
  balanceLockedBTC: string;
  balanceLockedUSDT: string;
  balanceTotal: string;
  balanceTotalBTC: string;
  balanceTotalExchCoin: string;
  balanceTotalUSDT: string;
  exchCoin: string;
  maxWithdrawAmount: string;
};

export type CoinNetwork = {
  name: string;
  network: string;
  coin: string;
  addressRegex: string;
  depositDesc: string;
  depositEnable: boolean;
  isDefault: boolean;
  memoRegex: string;
  resetAddressStatus: boolean;
  specialTips: string;
  withdrawDesc: string;
  withdrawEnable: boolean;
  withdrawFee: string;
  withdrawMin: string;
  integerMultiple: string;
};

export type CoinDetail = {
  name: string;
  networks: CoinNetwork[];
};

export type CoinBalances = Record<string, CoinBalance>;
export type AccountCoinBalances = {
  exchangeInternalId: string;
  balances: CoinBalances;
}[];
export type CoinDetails = Record<string, CoinDetail>;
export type AggregatedBalances = Record<string, CoinBalance & CoinDetail>;

export type DepositInfo = {
  currency: string;
  address: string;
  tag: string;
  info: {
    coin: string;
    address: string;
    tag: string;
    url: string;
  };
};

export const TRANSACTION_TYPE = {
  // Deposit from an external address
  DEPOSIT: 'deposit',
  // Withdrawal from a Zignaly exchange account to an external address
  WITHDRAW: 'withdrawal',
  // Investment in a PS1 service
  PS_DEPOSIT: 'psDeposit',
  // Investment out from a PS1 service
  PS_WITHDRAW: 'psWithdraw',
  // Transfers made during PSDS (free withdrawal)
  PSDS: 'psds',
  // Internal transfers of PS2 (between SCA and STA or from STA to DFA when a service is converted to PS2)
  PS2: 'ps2',
  // Transfers made when buying ZIG
  BUYZIG: 'buyZig',
  // In PS1 transfers when the trader receives his success fee
  SUCCESS_FEE: 'psSuccessFee',
  // All the others that are mainly the ones between internal transfers between his accounts
  USER: 'user',
};
export type TransactionType = keyof typeof TRANSACTION_TYPE;

export const enum TransactionStateType {
  COMPLETED = 'completed',
  PENDING = 'pending',
  ERROR = 'error',
}

export type Transaction = {
  from: string;
  fromName: string;
  to: string;
  toName?: string;
  txId: string;
  amount: number;
  asset: string;
  status: TransactionStateType;
  message?: string;
  txType: TransactionType;
  timestamp: number;
  datetime: string;
  network: string;
  fee: {
    currency: string;
    cost: number;
  };
  servicePsVersion?: number;
};

export type Transactions = InfiniteQueryResponse<Transaction[]>;
