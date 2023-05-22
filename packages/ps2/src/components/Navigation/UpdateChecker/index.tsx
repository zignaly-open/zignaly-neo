import React, { useEffect } from 'react';
import { useUpdateCheck } from 'react-update-notification';
import { UpdateStatus } from 'react-update-notification/lib/types';
import { VERSION_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';

const UpdateChecker: React.FC = () => {
  const toast = useToast();
  const { t } = useTranslation('common');
  const { status, reloadPage, checkUpdate } = useUpdateCheck({
    type: 'manual',
    ignoreServerCache: true,
  });

  useEffect(() => {
    if (status === UpdateStatus.available) return;
    const timeoutId = window.setTimeout(checkUpdate, VERSION_CHECK_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [status, checkUpdate]);

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
