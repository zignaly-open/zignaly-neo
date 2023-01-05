import Theme from '@zignaly-open/ui/lib/theme/theme';
import { TransactionStateType } from 'apis/wallet/types';

export type WalletTransactionsProps = {};

// export const TRANSACTION_TYPE_NAME = {
//   [TRANSACTION_TYPE.DEPOSIT]: 'deposit',
//   [TRANSACTION_TYPE.WITHDRAW]: 'withdrawal',
//   [TRANSACTION_TYPE.PS_DEPOSIT]: 'psDeposit',
//   [TRANSACTION_TYPE.PS_WITHDRAW]: 'psWithdraw',
//   [TRANSACTION_TYPE.PS2]: 'ps2',
//   [TRANSACTION_TYPE.PSDS]: 'type.psds',
//   [TRANSACTION_TYPE.BUYZIG]: 'type.buyZig',
//   [TRANSACTION_TYPE.SUCCESS_FEE]: 'type.traderFee',
//   [TRANSACTION_TYPE.USER]: 'type.user',
// };

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
