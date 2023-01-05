import React from 'react';
import { Box } from '@mui/material';
import {
  Transaction,
  TransactionType,
  TRANSACTION_TYPE,
} from 'apis/coin/types';
import ServiceLink from '../ProviderLink';
import ZignalyAccount from '../TransferZigLabel';
import { Side, SideType } from './types';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from '../TransactionDetails/styles';
import ChainIcon from 'components/ChainIcon';

const getTransactionSideType = (
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

const FromTo = ({
  transaction,
  side,
}: {
  transaction: Transaction;
  side: Side;
}) => {
  const { from, to, fromName, toName, network, txType, servicePsVersion } =
    transaction;
  const idAddress = side === 'to' ? to : from;
  const name = side === 'to' ? toName : fromName;
  const sideType = getTransactionSideType(txType, side);
  const { t } = useTranslation('transactions-history');

  return sideType === 'service' ? (
    <ServiceLink
      serviceId={idAddress}
      serviceName={name}
      servicePsVersion={servicePsVersion}
    />
  ) : sideType === 'external' ? (
    <>
      <Box mr={2}>
        <ChainIcon network={network} />
      </Box>
      <TypographyPanelName>{idAddress || t('external')}</TypographyPanelName>
    </>
  ) : (
    <ZignalyAccount name={name} />
  );
};

export default FromTo;
