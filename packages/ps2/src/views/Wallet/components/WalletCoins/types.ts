import { WalletBalance, WalletBalances, WalletCoins } from 'apis/wallet/types';

export type WalletCoinsProps = {
  coins: WalletCoins;
  balances: WalletBalances;
};

export type WalletCoinsTableType = {
  coin: string;
  balance: WalletBalance;
};
