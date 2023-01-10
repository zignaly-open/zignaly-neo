import { WalletCoins } from 'apis/wallet/types';

export interface WalletTopPanelProps {
  balance: number;
  savings: number;
  coins: WalletCoins;
}
