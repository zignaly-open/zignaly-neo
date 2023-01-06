import { WalletCoins } from 'apis/wallet/types';

export type WalletDepositModalProps = {
  selectedCoin: string;
  coins: WalletCoins;
};

export type CoinNetworkValue = CoinNetwork & {
  caption: string;
};

export type CoinValue = {
  id: string;
  caption: string;
  leftElement: React.ReactElement;
  inOrders: string;
  balance: string;
  available: string;
  networks: CoinNetworkValue[];
};

export type DepositFormData = {
  coin: string;
  network: string;
};
