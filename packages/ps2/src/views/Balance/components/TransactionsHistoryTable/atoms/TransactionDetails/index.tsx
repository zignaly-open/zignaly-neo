import React from 'react';
import { Transaction } from 'apis/coin/types';
import {
  TransactionPanel,
  TypographyPanelLabel,
  TypographyPanelName,
} from './styles';
import { Box } from '@mui/material';
import FromTo from '../FromTo';
import { ArrowRightAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

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
        <TypographyPanelName>{transaction.txId}</TypographyPanelName>
      </Box>
      {transaction.message && (
        <Box display='flex' alignItems='center'>
          <TypographyPanelLabel>{t('details.note')}</TypographyPanelLabel>
          <TypographyPanelName>{transaction.message}</TypographyPanelName>
        </Box>
      )}
    </TransactionPanel>
  );
};
export default TransactionDetails;
