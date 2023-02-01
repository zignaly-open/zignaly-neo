import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useTransactionsHistoryCsvMutation } from 'apis/coin/api';
import { useActiveExchange } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { ExportModalProps } from './types';
import { differenceInDays, subDays } from 'date-fns';
import { Data } from '../BalanceAccountSelector/styles';

function ExportModal({
  close,
  ...props
}: ExportModalProps): React.ReactElement {
  const { t } = useTranslation('transactions-history');
  const [exportCsv, exportStatus] = useTransactionsHistoryCsvMutation();
  const { internalId, createdAt } = useActiveExchange();
  const toast = useToast();

  return (
    <ZModal wide {...props} close={close} title={t('export.title')}>
      <ZigTypography>{t('export.description')}</ZigTypography>
      <ModalActions>
        <ZigButton
          onClick={close}
          variant='outlined'
          size='large'
          id={'export-transactions__cancel'}
        >
          {t('action:cancel')}
        </ZigButton>
        <ZigButton
          id={'export-transactions__proceed'}
          onClick={() =>
            exportCsv({
              exchangeInternalId: internalId,
              days: differenceInDays(new Date(createdAt), new Date()) + 1,
            }).then(() => {
              toast.success(t('export.success'));
              close();
            })
          }
          variant='contained'
          size='large'
          loading={exportStatus.isLoading}
        >
          {t('action:proceed')}
        </ZigButton>
      </ModalActions>
    </ZModal>
  );
}

export default ExportModal;
