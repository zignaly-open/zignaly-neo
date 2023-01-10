import { WalletCoins } from 'apis/wallet/types';

export type WalletDepositModalProps = {
  selectedCoin: string;
  coins: WalletCoins;
};

export type DepositFormData = {
  network: string;
};
