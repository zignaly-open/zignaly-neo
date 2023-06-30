import { CoinBalance, CoinDetail } from '../../../../apis/coin/types';

export type SwapCoinsModalProps = {
  step: string;
  setStep: (value: '' | 'confirm') => void;
  close: () => void;
  selectedCoin?: { coin: string; balance: CoinBalance & CoinDetail };
};
