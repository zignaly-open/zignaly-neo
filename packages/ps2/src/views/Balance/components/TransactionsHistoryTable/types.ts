import { Transaction, TransactionType } from 'apis/coin/types';

export const transactionTypeName = {
  [TransactionType.DEPOSIT]: 'type.deposit',
  [TransactionType.WITHDRAW]: 'type.withdrawal',
  [TransactionType.PS_DEPOSIT]: 'type.psDeposit',
  [TransactionType.PS2_DEPOSIT]: 'type.psDeposit',
  [TransactionType.PS_WITHDRAW]: 'type.psWithdraw',
  [TransactionType.PS2]: 'type.ps2',
  [TransactionType.PSDS]: 'type.psds',
  [TransactionType.BUYZIG]: 'type.buyZig',
  [TransactionType.SUCCESS_FEE]: 'type.psSuccessFee',
  [TransactionType.USER]: 'type.user',
  [TransactionType.PIFA]: 'type.pifa',
};

export type TransactionsTableDataType = Transaction & { assetName: string };
