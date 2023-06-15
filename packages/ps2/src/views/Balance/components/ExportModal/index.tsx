import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ModalActions as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useTransactionsHistoryCsvMutation } from 'apis/coin/api';
import { useActiveExchange } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
import { ExportModalProps } from './types';
import { differenceInDays } from 'date-fns';

function ExportModal({
  close,
  type,
  ...props
}: ExportModalProps): React.ReactElement {
  const { t } = useTranslation('transactions-history');
  const [exportCsv, exportStatus] = useTransactionsHistoryCsvMutation();
  const { internalId, createdAt } = useActiveExchange();
  const toast = useToast();

  return (
    <ZModal wide {...props} close={close} title={t('export.title')}>
      <div>
        <ZigTypography textAlign={'center'}>
          {t('export.description')}
        </ZigTypography>
        <ModalActions>
          <ZigButton
            id={'export-transactions__proceed'}
            onClick={() =>
              exportCsv({
                exchangeInternalId: internalId,
                type,
                days: differenceInDays(new Date(), new Date(createdAt)) + 1,
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
      </div>
    </ZModal>
  );
}

export default ExportModal;
