import { InputAmountAdvancedValueType } from '@zignaly-open/ui';

export type WithdrawFormData = {
  coin: string;
  network: string;
  tag: string;
  address: string;
  amount: InputAmountAdvancedValueType;
};
