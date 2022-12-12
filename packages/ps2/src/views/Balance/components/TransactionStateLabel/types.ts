import Theme from '@zignaly-open/ui/lib/theme/theme';
import { TransactionStateType } from 'apis/coin/types';

export const transactionStateName: {
  [key in TransactionStateType]: string;
} = {
  // [TransactionStateType.CONNECTED]: 'status.connected',
  [TransactionStateType.COMPLETED]: 'status.completed',
  [TransactionStateType.PENDING]: 'status.pending',
  // [TransactionStateType.SOFT_DISCONNECT]: 'status.soft-disconnect',
  // [TransactionStateType.HARD_DISCONNECT]: 'status.hard-disconnect',
  // [TransactionStateType.SUSPENDED]: 'status.suspended',
  // [TransactionStateType.DISCONNECTED]: 'status.disconnected',
  // [TransactionStateType.OWNER]: 'status.owner',
};

export const transactionStateColor: {
  [key in TransactionStateType]: keyof Theme;
} = {
  [TransactionStateType.COMPLETED]: 'greenGraph',
  // [TransactionStateType.PENDING]: theme.palette.neutral175,
  [TransactionStateType.PENDING]: 'neutral175',
  // [TransactionStateType.SOFT_DISCONNECT]: theme.palette.yellow,
  // [TransactionStateType.HARD_DISCONNECT]: theme.palette.redGraphOrError,
  // [TransactionStateType.SUSPENDED]: theme.palette.red,
  // [TransactionStateType.DISCONNECTED]: theme.palette.neutral400,
  // [TransactionStateType.OWNER]: theme.palette.neutral100,
};
