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
