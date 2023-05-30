export enum EditInvestmentViews {
  EditInvestment = 'edit-investment',
  EditInvestmentSuccess = 'edit-investment-success',
  PendingTransactions = 'pending-transactions',
  WithdrawSuccess = 'withdraw-investment-success',
  WithdrawInvestment = 'withdraw-investment',
  WithdrawPerform = 'withdraw-investment-perform',
}

export type ChangeViewFn = (view: EditInvestmentViews) => void;

export type PendingTransactionListItemType = {
  amount: number;
  type: string;
  status: string;
};

export type DepositModalProps = {
  selectedCoin?: string;
  allowedCoins?: string[];
};

export type WithdrawModalProps = {
  selectedCoin?: string;
  setStep: (value: '' | 'confirm' | 'success') => void;
  close: () => void;
};

export enum ChooseDepositTypeViews {
  DepositView = 'deposit',
  ChooseDepositTypeView = 'choose-deposit-type',
}

export type UseModalReturn = {
  title: string;
  component: () => JSX.Element;
};
