import { CoinBalance, CoinDetail } from '../../../../apis/coin/types';

export type SwapCoinsModalProps = {
  step: string;
  setStep: (value: '' | 'confirm') => void;
  close: () => void;
  selectedCoin?: { coin: string; balance: CoinBalance & CoinDetail };
};

export type CoinsSelect = {
  coin: string;
  name: string;
  available: string | number;
  label: JSX.Element;
};
