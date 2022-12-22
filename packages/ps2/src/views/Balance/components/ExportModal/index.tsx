import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useTransactionsHistoryCsvMutation } from 'apis/coin/api';
import { useActiveExchange } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { ExportModalProps } from './types';

function ExportModal({
  close,
  ...props
}: ExportModalProps): React.ReactElement {
  const { t } = useTranslation('transactions-history');
  const [exportCsv, exportStatus] = useTransactionsHistoryCsvMutation();
  const { internalId } = useActiveExchange();
  const toast = useToast();

  return (
    <ZModal wide {...props} close={close} title={t('export.title')}>
      <ZigTypography>{t('export.description')}</ZigTypography>
      <ModalActions>
        <ZigButton onClick={close} variant='outlined' size='large'>
          {t('action:cancel')}
        </ZigButton>
        <ZigButton
          onClick={() =>
            exportCsv({
              exchangeInternalId: internalId,
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
