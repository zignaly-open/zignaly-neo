import { TransactionStateType } from 'apis/coin/types';

export const transactionStateName: {
  [key in TransactionStateType]: string;
} = {
  [TransactionStateType.COMPLETED]: 'status.completed',
  [TransactionStateType.SENT]: 'status.completed',
  [TransactionStateType.TRANSFER]: 'status.pending',
  [TransactionStateType.PENDING]: 'status.pending',
  [TransactionStateType.REVIEWING]: 'status.reviewing',
  [TransactionStateType.PENDING_TO_APPROVE]: 'status.reviewing',
  [TransactionStateType.ERROR]: 'status.error',
};

export const transactionStateColor = {
  [TransactionStateType.COMPLETED]: 'greenGraph',
  [TransactionStateType.SENT]: 'greenGraph',
  [TransactionStateType.TRANSFER]: 'yellow',
  [TransactionStateType.PENDING]: 'yellow',
  [TransactionStateType.REVIEWING]: 'yellow',
  [TransactionStateType.PENDING_TO_APPROVE]: 'yellow',
  [TransactionStateType.ERROR]: 'red',
};
