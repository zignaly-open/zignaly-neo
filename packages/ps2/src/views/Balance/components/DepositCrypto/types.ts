export enum DepositViews {
  Start = 'start',
  Purchase = 'purchase',
  Deposit = 'deposit',
}

export type ChangeViewFn = (view: DepositViews) => void;
