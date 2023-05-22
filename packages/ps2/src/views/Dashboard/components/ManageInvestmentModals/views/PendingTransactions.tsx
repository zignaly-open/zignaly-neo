import React from 'react';
import { Inline, PendingTransaction } from '../styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ZigRefreshIcon, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import { useTranslation } from 'react-i18next';
import {
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../../../apis/investment/use';

const PendingTransactions: React.FC<{
  setView: ChangeViewFn;
}> = ({ setView }) => {
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
        <ZigRefreshIcon />
        <ZigTypography variant={'body1'} color={'yellow'}>
          {t('pendingTransactions.status', {
            count: pendingTransactionsCount,
          })}
        </ZigTypography>
      </Inline>
      <div>
        <ZigButton
          variant={'text'}
          endIcon={
            <KeyboardArrowRightIcon
              sx={{ width: '22px !important', height: '22px !important' }}
            />
          }
          onClick={() => setView(EditInvestmentViews.PendingTransactions)}
        >
          {t('pendingTransactions.link-label')}
        </ZigButton>
      </div>
    </PendingTransaction>
  ) : null;
};

export default PendingTransactions;
