import { Transaction, TRANSACTION_TYPE } from 'apis/coin/types';

export const TRANSACTION_TYPE_NAME = {
  [TRANSACTION_TYPE.DEPOSIT]: 'type.deposit',
  [TRANSACTION_TYPE.WITHDRAW]: 'type.withdrawal',
  [TRANSACTION_TYPE.PS_DEPOSIT]: 'type.psDeposit',
  [TRANSACTION_TYPE.PS_WITHDRAW]: 'type.psWithdraw',
  [TRANSACTION_TYPE.REWARD]: 'type.reward',
  [TRANSACTION_TYPE.PS2]: 'type.ps2',
  [TRANSACTION_TYPE.PSDS]: 'type.psds',
  [TRANSACTION_TYPE.BUYZIG]: 'type.buyZig',
  [TRANSACTION_TYPE.SUCCESS_FEE]: 'type.traderFee',
  [TRANSACTION_TYPE.USER]: 'type.user',
};

export type TransactionsTableDataType = Transaction & { assetName: string };
export type Side = 'to' | 'from';
export type SideType = 'service' | 'external' | 'zignaly';
