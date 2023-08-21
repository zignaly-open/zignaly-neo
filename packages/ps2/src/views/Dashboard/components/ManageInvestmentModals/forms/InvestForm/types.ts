import { InvestmentViews } from '../../types';

export type InvestFormProps = {
  close: () => void;
  view: InvestmentViews;
  setView: (view: InvestmentViews) => void;
};

export type InvestFormData = {
  profitPercentage: number;
  transferConfirm: string;
  transferLabelForValidation: string;
  understandRisk: boolean;
  amountTransfer?: string;
};
