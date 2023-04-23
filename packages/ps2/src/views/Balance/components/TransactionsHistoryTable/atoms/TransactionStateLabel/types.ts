import { ThemeType } from '@zignaly-open/ui';
import { TransactionStateType } from 'apis/coin/types';

export const transactionStateName: {
  [key in TransactionStateType]: string;
} = {
  [TransactionStateType.COMPLETED]: 'status.completed',
  [TransactionStateType.SENT]: 'status.completed',
  [TransactionStateType.TRANSFER]: 'status.pending',
  [TransactionStateType.PENDING]: 'status.pending',
  [TransactionStateType.ERROR]: 'status.error',
};

export const transactionStateColor: {
  [key in TransactionStateType]: keyof ThemeType;
} = {
  [TransactionStateType.COMPLETED]: 'greenGraph',
  [TransactionStateType.SENT]: 'greenGraph',
  [TransactionStateType.TRANSFER]: 'yellow',
  [TransactionStateType.PENDING]: 'yellow',
  [TransactionStateType.ERROR]: 'red',
};
