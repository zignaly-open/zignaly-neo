import Theme from '@zignaly-open/ui/lib/theme/theme';
import { TransactionStateType } from 'apis/wallet/types';

export const transactionStateName: {
  [key in TransactionStateType]: string;
} = {
  [TransactionStateType.COMPLETED]: 'transactions.status.completed',
  [TransactionStateType.PENDING]: 'transactions.status.pending',
  [TransactionStateType.ERROR]: 'transactions.status.error',
};

export const transactionStateColor: {
  [key in TransactionStateType]: keyof Theme;
} = {
  [TransactionStateType.COMPLETED]: 'greenGraph',
  [TransactionStateType.PENDING]: 'yellow',
  [TransactionStateType.ERROR]: 'red',
};
