import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import {
  Transaction,
  TransactionType,
  TRANSACTION_TYPE,
} from 'apis/coin/types';
import ChainIcon from '../ChainIcon';
import ServiceLink from '../ProviderLink';
import ZignalyAccount from '../TransferZigLabel';
import { Side, SideType } from './types';
import { useTranslation } from 'react-i18next';

const getTransactionSideType = (
  txType: TransactionType,
  side: Side,
): SideType => {
  if (
    ([TRANSACTION_TYPE.PS_DEPOSIT, TRANSACTION_TYPE.PS2_DEPOSIT].includes(
      txType,
    ) &&
      side === 'to') ||
    (txType === TRANSACTION_TYPE.PS_WITHDRAW && side === 'from')
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

const FromTo = ({
  transaction,
  side,
}: {
  transaction: Transaction;
  side: Side;
}) => {
  const { from, to, fromName, toName, network, txType } = transaction;
  const idAddress = side === 'to' ? to : from;
  const name = side === 'to' ? toName : fromName;
  const sideType = getTransactionSideType(txType, side);
  const { t } = useTranslation('transactions-history');

  return sideType === 'service' ? (
    <ServiceLink serviceId={idAddress} serviceName={name} />
  ) : sideType === 'external' ? (
    <>
      <Box mr={2}>
        <ChainIcon network={network} />
      </Box>
      <ZigTypography>{idAddress || t('external')}</ZigTypography>
    </>
  ) : (
    <ZignalyAccount name={name} />
  );
};

export default FromTo;
