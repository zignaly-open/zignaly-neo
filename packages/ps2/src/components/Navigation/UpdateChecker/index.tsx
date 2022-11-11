import React, { useEffect } from 'react';
import { useUpdateCheck } from 'react-update-notification';
import { UpdateStatus } from 'react-update-notification/lib/types';
import { VERSION_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';

const UpdateChecker: React.FC = () => {
  const toast = useToast();
  const { t } = useTranslation('common');
  const { status, reloadPage } = useUpdateCheck({
    type: 'interval',
    ignoreServerCache: true,
    interval: VERSION_CHECK_INTERVAL,
  });

  useEffect(() => {
    if (status === UpdateStatus.available) {
      toast.info(t('refresh.short'), {
        autoClose: false,
        position: 'bottom-left',
        onClick: reloadPage,
      });
    }
  }, [status]);

  return null;
};

export default UpdateChecker;
