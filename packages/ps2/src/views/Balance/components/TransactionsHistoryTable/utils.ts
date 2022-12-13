import { TransactionType } from 'apis/coin/types';
import { Side } from './types';

export const getTransactionSideType = (txType: TransactionType, side: Side) => {
  if (
    ([TransactionType.PS_DEPOSIT, TransactionType.PS2_DEPOSIT].includes(
      txType,
    ) &&
      side === 'to') ||
    (txType === TransactionType.PS_WITHDRAW && side === 'from')
  ) {
    return 'service';
  }

  if (
    (txType === TransactionType.DEPOSIT && side === 'from') ||
    (txType === TransactionType.WITHDRAW && side === 'to')
  ) {
    return 'external';
  }

  return 'zignaly';
};
