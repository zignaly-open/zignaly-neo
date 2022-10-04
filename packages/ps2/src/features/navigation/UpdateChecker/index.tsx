import React, { useEffect } from 'react';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import { useUpdateCheck } from 'react-update-notification';
import { UpdateStatus } from 'react-update-notification/lib/types';
import NewVersionModal from '../../../components/NewVersionModal';
import { alertMode, VERSION_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { AlertModes } from './types';

const UpdateChecker: React.FC = () => {
  const { showModal } = useModal();
  const toast = useToast();
  const { t } = useTranslation('common');
  const { status, reloadPage } = useUpdateCheck({
    type: 'interval',
    interval: VERSION_CHECK_INTERVAL,
  });

  useEffect(() => {
    if (status === UpdateStatus.available) {
      if (alertMode === AlertModes.Toast) {
        toast.info(t('refresh.short'), {
          autoClose: false,
          onClick: reloadPage,
        });
      } else {
        const modal: ShowFnOutput<void> = showModal(NewVersionModal, {
          close: () => modal.hide(),
          reloadPage,
        });
      }
    }
  }, [status]);

  return null;
};

export default UpdateChecker;
