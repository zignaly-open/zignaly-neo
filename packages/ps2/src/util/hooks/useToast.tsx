import { toast, ToastOptions } from 'react-toastify';
import { Toaster } from '@zignaly-open/ui';
import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { BackendError } from '../errors';

type ToastFn = (text: string, extraOptions?: ToastOptions) => void;

const showToast =
  (type: 'success' | 'error' | 'info') =>
  (message: string, options?: ToastOptions) =>
    toast(<Toaster variant={type} caption={message} />, {
      type: type,
      icon: false,
      ...options,
    } as ToastOptions);

const backendErrorText = (t: TFunction, error: BackendError) => {
  const { code, msg } = error?.data?.error || {};
  const translationKey = 'error:error.' + code;
  return code && t(translationKey) !== translationKey.replace(/^error:/, '')
    ? t(translationKey)
    : msg || t('error:something-went-wrong');
};

const lastShownBackendError = { error: '', time: 0, expiry: 10_000 };

export const backendError = (t: TFunction, error: BackendError) => {
  const text = backendErrorText(t, error);
  if (
    lastShownBackendError.error === text &&
    lastShownBackendError.time + lastShownBackendError.expiry > Date.now()
  )
    return;
  lastShownBackendError.time = Date.now();
  lastShownBackendError.error = text;
  showToast('error')(text);
};

export function useToast(): {
  success: ToastFn;
  info: ToastFn;
  error: ToastFn;
  backendError: (error?: BackendError) => void;
} {
  const { t } = useTranslation('error');
  return {
    success: showToast('success'),
    error: showToast('error'),
    info: showToast('info'),
    backendError: (error: BackendError) => backendError(t, error),
  };
}
