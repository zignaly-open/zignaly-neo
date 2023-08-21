import { ChangeViewFn } from '../../types';

export type EditInvestmentFormProps = {
  onClickWithdrawInvestment: () => void;
  setView: ChangeViewFn;
  close: () => void;
};

export type EditFormData = {
  profitPercentage?: number;
  amountTransfer?: string;
};
