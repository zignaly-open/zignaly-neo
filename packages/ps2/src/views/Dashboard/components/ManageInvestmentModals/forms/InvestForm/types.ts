import { InvestmentViews } from '../../types';

export type InvestFormProps = {
  close: () => void;
  view: InvestmentViews;
  setView: (view: InvestmentViews) => void;
};

export type InvestFormData = {
  profitPercentage: string | number;
  transferConfirm: string;
  transferLabelForValidation: string;
  understandMargin: boolean;
  understandMoneyTransferred: boolean;
  understandDisconnecting: boolean;
  amountTransfer?: string;
};
