import React from 'react';
import { Transaction } from 'apis/wallet/types';
import { Box } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FromTo from './atoms/FromTo';
import {
  TransactionPanel,
  TypographyPanelLabel,
  TypographyPanelName,
} from 'views/Balance/components/TransactionsHistoryTable/atoms/TransactionDetails/styles';

const TransactionDetails = ({ transaction }: { transaction: Transaction }) => {
  const { t } = useTranslation('transactions-history');

  return (
    <TransactionPanel>
      <Box display='flex' alignItems='center'>
        <TypographyPanelLabel>{t('details.from')}</TypographyPanelLabel>
        <FromTo side='from' transaction={transaction} />
        <ArrowRightAlt style={{ margin: '0 21px' }} />
        <TypographyPanelLabel>{t('details.to')}</TypographyPanelLabel>
        <FromTo side='to' transaction={transaction} />
      </Box>
      <Box display='flex' alignItems='center'>
        <TypographyPanelLabel>{t('details.txHash')}</TypographyPanelLabel>
        <TypographyPanelName>{transaction.transactionId}</TypographyPanelName>
      </Box>
      {transaction.note && (
        <Box display='flex' alignItems='center'>
          <TypographyPanelLabel>{t('details.note')}</TypographyPanelLabel>
          <TypographyPanelName>{transaction.note}</TypographyPanelName>
        </Box>
      )}
    </TransactionPanel>
  );
};
export default TransactionDetails;
