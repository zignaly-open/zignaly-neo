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
  amount: JSX.Element;
  type: string;
  status: string;
};

export type DepositModalProps = {
  selectedCoin?: string;
  allowedCoins?: string[];
};
