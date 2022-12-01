import { CoinNetwork } from 'apis/coin/types';

export interface ConfirmWithdrawalModalProps {
  networkCaption: string;
  address: string;
  tag: string;
  coin: string;
  onBack?: () => void;
  onWithdraw?: () => void;
  amount: string;
  network: CoinNetwork;
  onClickClose: any;
}
