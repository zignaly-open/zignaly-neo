import { TransactionType, TRANSACTION_TYPE } from 'apis/coin/types';
import { Side, SideType } from './types';

export const truncateAddress = (address: string) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
};

export const getTransactionSideType = (
  txType: TransactionType,
  side: Side,
): SideType => {
  if (
    (txType === TRANSACTION_TYPE.PS_DEPOSIT && side === 'to') ||
    ([
      TRANSACTION_TYPE.PS_WITHDRAW,
      TRANSACTION_TYPE.PSDS,
      TRANSACTION_TYPE.SUCCESS_FEE,
    ].includes(txType) &&
      side === 'from')
  ) {
    return 'service';
  }

  if (
    (txType === TRANSACTION_TYPE.DEPOSIT && side === 'from') ||
    (txType === TRANSACTION_TYPE.WITHDRAW && side === 'to')
  ) {
    return 'external';
  }

  return 'zignaly';
};
