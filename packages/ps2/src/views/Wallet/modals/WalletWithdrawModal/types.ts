import { InputAmountAdvancedValueType } from '@zignaly-open/ui';
import { WalletCoins } from 'apis/wallet/types';

export type WithdrawFormData = {
  coin: string;
  network: string;
  tag: string;
  address: string;
  amount: InputAmountAdvancedValueType;
};

export type WalletWithdrawModalProps = {
  coins: WalletCoins;
  selectedCoin: string;
  setStep: (value: '' | 'confirm' | 'success') => void;
  close: () => void;
};
