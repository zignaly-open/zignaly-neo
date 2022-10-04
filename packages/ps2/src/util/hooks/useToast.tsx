import { toast, ToastOptions } from 'react-toastify';
import { Toaster } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Options = {
  autoClose?: number | boolean;
  onClick?: () => void;
};

type ToastFn = (text: string, extraOptions?: Options) => void;

type BackendError = {
  data?: {
    error?: {
      code?: number;
    };
  };
};

export function useToast(): {
  success: ToastFn;
  info: ToastFn;
  error: ToastFn;
  backendError: (error?: BackendError) => void;
} {
  const { t } = useTranslation('error');
  const showToast =
    (type: 'success' | 'error' | 'info') =>
    (message: string, options?: Options) =>
      toast(<Toaster variant={type} caption={message} />, {
        type: type,
        icon: false,
        ...options,
      } as unknown as ToastOptions<Options>);
  return {
    success: showToast('success'),
    error: showToast('error'),
    info: showToast('info'),
    backendError: (error: BackendError) => {
      const code = error?.data?.error?.code;
      const translationKey = 'error.' + code;
      showToast('error')(
        code && t(translationKey) !== translationKey
          ? t(translationKey)
          : t('something-went-wrong'),
      );
    },
  };
}
