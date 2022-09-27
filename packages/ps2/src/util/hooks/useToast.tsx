import { toast } from 'react-toastify';
import { Toaster } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ToastFn = (text: string) => void;
type BackendError = {
  data?: {
    error?: {
      code?: number;
    };
  };
};

export function useToast(): {
  success: ToastFn;
  error: ToastFn;
  backendError: (error?: BackendError) => void;
} {
  const { t } = useTranslation('error');
  const showToast = (message: string, type: 'success' | 'error') =>
    toast(<Toaster variant={type} caption={message} />, {
      type: type,
      icon: false,
    });
  return {
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    backendError: (error: BackendError) => {
      const code = error?.data?.error?.code;
      const translationKey = 'error.' + code;
      showToast(
        code && t(translationKey) !== translationKey
          ? t(translationKey)
          : t('something-went-wrong'),
        'error',
      );
    },
  };
}
