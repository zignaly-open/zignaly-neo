import React from 'react';
import { Inline, PendingTransaction } from '../styles';
import {
  ArrowRightIcon,
  RefreshIcon,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import { useTheme } from 'styled-components';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { useTranslation } from 'react-i18next';
import { useInvestmentDetails, useSelectedInvestment } from '../../../use';

const PendingTransactions: React.FC<{
  setView: ChangeViewFn;
}> = ({ setView }) => {
  const theme = useTheme() as Theme;
  const { serviceId } = useSelectedInvestment();
  const { data: details } = useInvestmentDetails(serviceId);
  const { t } = useTranslation('edit-investment');

  const pendingTransactionsCount = [
    details?.pending,
    details?.transferOut,
    details?.profitOut,
  ].filter((x) => x && x > 0).length;

  return pendingTransactionsCount > 0 ? (
    <PendingTransaction>
      <Inline>
        <RefreshIcon />
        <Typography variant={'body1'} color={'yellow'}>
          {t('pendingTransactions.status', {
            count: pendingTransactionsCount,
          })}
        </Typography>
      </Inline>
      <div>
        <TextButton
          rightElement={
            <ArrowRightIcon
              width={'22px'}
              height={'22px'}
              color={theme.links}
            />
          }
          caption={t('pendingTransactions.link-label')}
          onClick={() => setView(EditInvestmentViews.PendingTransactions)}
        />
      </div>
    </PendingTransaction>
  ) : null;
};

export default PendingTransactions;
