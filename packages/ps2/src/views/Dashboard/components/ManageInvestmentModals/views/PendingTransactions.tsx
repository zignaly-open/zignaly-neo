import React from 'react';
import { Inline, PendingTransaction } from '../styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ZigRefreshIcon } from '@zignaly-open/ui/icons';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import { useTranslation } from 'react-i18next';
import {
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../../../apis/investment/use';

const PendingTransactions: React.FC<{
  setView: ChangeViewFn;
  prefixId?: string;
}> = ({ setView, prefixId }) => {
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
        <ZigRefreshIcon id={prefixId && `${prefixId}__refresh-icon`} />
        <ZigTypography
          variant={'body1'}
          color={'yellow'}
          id={prefixId && `${prefixId}__pending-label`}
        >
          {t('pendingTransactions.status', {
            count: pendingTransactionsCount,
          })}
        </ZigTypography>
      </Inline>
      <div>
        <ZigButton
          variant={'text'}
          id={prefixId && `${prefixId}__show-pending-transactions`}
          endIcon={
            <KeyboardArrowRightIcon
              sx={{
                width: '22px !important',
                height: '22px !important',
                fill: 'currentcolor !important',
              }}
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
