import { useToast } from './hooks/useToast';
import { useTranslation } from 'react-i18next';
import { useUpdateCheck } from 'react-update-notification';
import { useEffect } from 'react';
import { UpdateStatus } from 'react-update-notification/lib/types';

export const VERSION_CHECK_INTERVAL = 10 * 60_000;

export function useUpdateChecker(): void {
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
}
