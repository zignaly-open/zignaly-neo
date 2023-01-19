import { WalletBalances, WalletCoins } from 'apis/wallet/types';

export interface WalletTopPanelProps {
  balances: WalletBalances;
  savings: number;
  coins: WalletCoins;
}
