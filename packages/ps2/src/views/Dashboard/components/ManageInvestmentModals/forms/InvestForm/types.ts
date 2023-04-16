import { InputAmountAdvancedValueType } from '@zignaly-open/ui';

export type InvestFormProps = {
  close: () => void;
  onInvested: () => void;
};

export type InvestFormData = {
  step: 1 | 2;
  profitPercentage: string | number;
  transferConfirm: string;
  transferLabelForValidation: string;
  understandMargin: boolean;
  understandMoneyTransferred: boolean;
  amountTransfer?: InputAmountAdvancedValueType;
};
