import type { ModalContainerProps } from '@zignaly-open/ui/lib/components/display/ZigModalContainer/types';

export enum EditInvestmentViews {
  EditInvestment = 'edit-investment',
  EditInvestmentSuccess = 'edit-investment-success',
  PendingTransactions = 'pending-transactions',
  WithdrawSuccess = 'withdraw-investment-success',
  WithdrawInvestment = 'withdraw-investment',
  WithdrawPerform = 'withdraw-investment-perform',
}

export enum InvestmentViews {
  Investment = 'investment',
  InvestmentSuccess = 'investment-success',
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
  close: () => void;
};

export type WithdrawModalProps = {
  step: string;
  selectedCoin?: string;
  setStep: (value: '' | 'confirm' | 'success') => void;
  close: () => void;
};

export enum ChooseDepositTypeViews {
  DepositView = 'deposit',
  ChooseDepositTypeView = 'deposit_or_buy',
  SwapDepositView = 'swap-deposit',
  SwapConfirmView = 'swap-confirm',
}

export type UseModalReturn = {
  title: string;
  component: () => JSX.Element;
  modalWidth?: number;
  view?: string;
} & Pick<ModalContainerProps, 'mobileFullScreen' | 'onGoBack'>;

export type ConvertPreviewType = {
  side: string;
  lastPrice: number;
  estimatedAmount: number;
  min: number;
};

export type ConfirmSwapDataType = {
  fromCoinAmount: number;
  toCoinAmount: number;
  fromCoin: string;
};
