import { ChangeViewFn } from '../../types';
import { InputAmountAdvancedValueType } from '@zignaly-open/ui';

export type EditInvestmentFormProps = {
  onClickWithdrawInvestment: () => void;
  setView: ChangeViewFn;
  close: () => void;
};

export type EditFormData = {
  profitPercentage: string | number;
  amountTransfer?: InputAmountAdvancedValueType;
};
