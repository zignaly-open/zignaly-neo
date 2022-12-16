import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { Transaction, TransactionType } from 'apis/coin/types';
import ChainIcon from '../ChainIcon';
import ServiceLink from '../ProviderLink';
import ZignalyAccount from '../TransferZigLabel';
import { Side } from './types';

const getTransactionSideType = (txType: TransactionType, side: Side) => {
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

  return sideType === 'service' ? (
    <ServiceLink serviceId={idAddress} serviceName={name} />
  ) : sideType === 'external' ? (
    <>
      <Box mr={2}>
        <ChainIcon network={network} />
      </Box>
      <ZigTypography>{idAddress}</ZigTypography>
    </>
  ) : (
    <ZignalyAccount name={name} />
  );
};

export default FromTo;
