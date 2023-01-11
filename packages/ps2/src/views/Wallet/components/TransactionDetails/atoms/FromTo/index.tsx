import React from 'react';
import { Side } from './types';
import { Transaction } from 'apis/wallet/types';
import ZignalyAccount from 'views/Balance/components/TransactionsHistoryTable/atoms/TransferZigLabel';
import ChainIcon from 'components/ChainIcon';
import { TypographyPanelName } from 'views/Balance/components/TransactionsHistoryTable/atoms/TransactionDetails/styles';
import { Box } from '@mui/material';
import ServiceLink from 'views/Balance/components/TransactionsHistoryTable/atoms/ProviderLink';

const FromTo = ({
  transaction,
  side,
}: {
  transaction: Transaction;
  side: Side;
}) => {
  const {
    fromAddress,
    toAddress,
    fromName,
    toName,
    providerId,
    network,
    providerName,
  } = transaction;
  const isWithdrawal = transaction.formattedAmount.startsWith('-');
  const address = isWithdrawal ? toAddress : fromAddress;
  const name = isWithdrawal ? toName : fromName;

  if ((side === 'from' && isWithdrawal) || (side === 'to' && !isWithdrawal)) {
    return <ZignalyAccount name='ZIG Wallet' />;
  }

  return transaction.zigpadId ? (
    <>
      <img
        src={transaction.zigpadLogo}
        width={24}
        height={24}
        style={{ margin: '0 8px 0 16px' }}
      />
      <TypographyPanelName>{transaction.zigpadName}</TypographyPanelName>
    </>
  ) : address ? (
    <Box gap={2} display='flex' alignItems='center'>
      <ChainIcon network={network} />
      <TypographyPanelName>{address}</TypographyPanelName>
    </Box>
  ) : providerId ? (
    <>
      <TypographyPanelName>
        {providerId ? (
          <ServiceLink
            serviceId={providerId}
            serviceName={providerName}
            servicePsVersion={2}
          />
        ) : (
          address
        )}
      </TypographyPanelName>
    </>
  ) : (
    <ZignalyAccount name={name} />
  );
};

export default FromTo;
