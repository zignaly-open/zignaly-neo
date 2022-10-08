export interface CoinState {
  coins?: Coins;
}

export type Coin = {
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

export type Coins = Record<string, Coin>;
