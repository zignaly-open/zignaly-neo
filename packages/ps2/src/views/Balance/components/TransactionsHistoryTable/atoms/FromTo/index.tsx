import React from 'react';
import { Box } from '@mui/material';
import { Transaction } from 'apis/coin/types';
import ServiceLink from '../ProviderLink';
import ZignalyAccount from '../TransferZigLabel';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from '../TransactionDetails/styles';
import ChainIcon from 'components/ChainIcon';
import { getTransactionSideType } from '../../util';
import { Side } from '../../types';

const FromTo = ({
  transaction,
  side,
  txId,
}: {
  transaction: Transaction;
  side: Side;
  txId?: string;
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
      id={`balances-table-transaction-expanded__${side}-${txId}`}
    />
  ) : sideType === 'external' ? (
    <>
      <Box mr={2} className={`balances-table-transaction-expanded__chain-icon`}>
        <ChainIcon network={network} />
      </Box>
      <TypographyPanelName
        id={`balances-table-transaction-expanded__${side}-${txId}`}
      >
        {idAddress || t('external')}
      </TypographyPanelName>
    </>
  ) : (
    <ZignalyAccount
      id={`balances-table-transaction-expanded__${side}-${txId}`}
      name={name}
    />
  );
};

export default FromTo;
