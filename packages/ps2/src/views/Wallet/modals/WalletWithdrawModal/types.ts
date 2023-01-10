import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';
import { WalletCoins } from 'apis/wallet/types';

export type WithdrawFormData = {
  coin: string;
  network: string;
  tag: string;
  address: string;
  amount: InputAmountAdvancedValue;
};

export type WalletWithdrawModalProps = {
  coins: WalletCoins;
  selectedCoin: string;
  setStep: (value: '' | 'confirm' | 'success') => void;
  close: () => void;
};
