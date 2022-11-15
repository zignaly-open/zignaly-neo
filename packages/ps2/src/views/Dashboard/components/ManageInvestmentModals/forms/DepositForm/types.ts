import { ReactElement } from 'react';
import { CoinNetwork } from '../../../../../../apis/coin/types';

export type CoinNetworkValue = CoinNetwork & {
  caption: string;
};

export type CoinValue = {
  id: string;
  caption: string;
  leftElement: ReactElement;
  inOrders: string;
  balance: string;
  available: string;
  networks: CoinNetworkValue[];
};

export type DepositFormData = {
  coin: string;
  network: string;
};
