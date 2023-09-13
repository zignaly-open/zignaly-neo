import { CoinBalance, CoinDetail } from '../../../../apis/coin/types';

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
  availableInUsd?: string | number;
};

export type SwapCoinsConfirmFormProps = {
  close: () => void;
  closeDepositSwap?: () => void;
  toCoin: string;
  fromCoin: string;
  toCoinAmount: number;
  fromCoinAmount: number;
  refetchBalance: () => void;
  rate: number;
  internalId?: string;
};
