import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type InvestFormProps = {
  close: () => void;
  onInvested: () => void;
};

export type InvestFormData = {
  step: 1 | 2;
  profitPercentage: string | number;
  transferConfirm: string;
  understandMargin: boolean;
  understandMoneyTransferred: boolean;
  amountTransfer?: InputAmountAdvancedValue;
};
