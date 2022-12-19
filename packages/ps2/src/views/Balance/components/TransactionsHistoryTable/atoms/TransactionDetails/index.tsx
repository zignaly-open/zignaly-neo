import React from 'react';
import { Transaction } from 'apis/coin/types';
import {
  TransactionPanel,
  TypographyAddress,
  TypographyPanelLabel,
} from './styles';
import { Box } from '@mui/material';
import FromTo from '../FromTo';
import { ArrowRightAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const TransactionDetails = ({ transaction }: { transaction: Transaction }) => {
  const { t } = useTranslation('transactions-history');

  return (
    <TransactionPanel>
      <Box display='flex' justifyContent='center'>
        <TypographyPanelLabel>{t('details.from')}</TypographyPanelLabel>
        <FromTo side='from' transaction={transaction} />
        <ArrowRightAlt style={{ margin: '0 21px' }} />
        <TypographyPanelLabel>{t('details.to')}</TypographyPanelLabel>
        <FromTo side='to' transaction={transaction} />
      </Box>
      <Box display='flex' alignItems='center' gap={5}>
        <Box display='flex' alignItems='center'>
          <TypographyPanelLabel>{t('details.txHash')}</TypographyPanelLabel>
          <TypographyAddress>{transaction.txId}</TypographyAddress>
        </Box>
        {transaction.note && (
          <Box display='flex' alignItems='center'>
            <TypographyPanelLabel>{t('details.note')}</TypographyPanelLabel>
            <TypographyAddress>{transaction.note}</TypographyAddress>
          </Box>
        )}
      </Box>
    </TransactionPanel>
  );
};
export default TransactionDetails;
