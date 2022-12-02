import { CoinNetwork } from 'apis/coin/types';

export interface ConfirmWithdrawalModalProps {
  address: string;
  tag: string;
  coin: string;
  back: () => void;
  close: () => void;
  amount: string;
  network: CoinNetwork;
}
