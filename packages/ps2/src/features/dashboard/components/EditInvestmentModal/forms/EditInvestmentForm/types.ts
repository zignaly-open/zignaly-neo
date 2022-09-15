import { ChangeViewFn } from '../../types';
import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type EditInvestmentFormProps = {
  onClickWithdrawInvestment: () => void;
  setView: ChangeViewFn;
  close: () => void;
};

export type EditFormData = {
  profitPercentage: string | number;
  amountTransfer?: InputAmountAdvancedValue;
};
