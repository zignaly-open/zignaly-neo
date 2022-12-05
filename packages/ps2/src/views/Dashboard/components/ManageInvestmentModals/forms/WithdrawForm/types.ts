import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type WithdrawFormData = {
  coin: string;
  network: string;
  tag: string;
  address: string;
  amount: InputAmountAdvancedValue;
};
