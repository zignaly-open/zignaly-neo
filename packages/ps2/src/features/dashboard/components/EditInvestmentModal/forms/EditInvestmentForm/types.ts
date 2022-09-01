import BigNumber from 'bignumber.js';
import { ChangeViewFn } from '../../types';

export type EditInvestmentFormProps = {
  onClickWithdrawInvestment: () => void;
  setView: ChangeViewFn;
  close: () => void;
};

export type EditFormData = {
  profitPercentage: string | number;
  amountTransfer?: {
    value: string | number | BigNumber;
    token: {
      id: string;
      balance: string | number | BigNumber;
    };
  };
};
