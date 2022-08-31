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
  name: string;
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
  id?: string;
  name: string;
  network: CoinNetwork[];
};

export type Balances = Record<string, CoinBalance>;
export type Coins = Record<string, CoinDetail>;

export interface MyBalancesState {
  balances?: Balances;
  coins?: Coins;
}
