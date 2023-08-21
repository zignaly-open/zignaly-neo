import { CoinBalance, CoinDetail } from '../../../../apis/coin/types';
import { QueryReturnTypeBasic } from '../../../../util/queryReturnType';

export type SwapCoinsModalProps = {
  step: string;
  setStep: (value: '' | 'confirm') => void;
  close: () => void;
  refetchBalance: () => void;
  selectedCoin?: { coin: string; balance: CoinBalance & CoinDetail };
};

export type CoinsSelect = {
  coin: string;
  available: string | number;
  label: JSX.Element;
};

export type SwapCoinsConfirmFormProps = {
  action: () => void;
  close: () => void;
  status: QueryReturnTypeBasic<unknown>;
  toCoin: string;
  fromCoin: string;
  toCoinAmount: number;
  fromCoinAmount: number;
  refetchBalance: () => void;
  rate: number;
};
