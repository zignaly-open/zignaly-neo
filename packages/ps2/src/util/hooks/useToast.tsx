import { useToast as getToastUi } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { BackendError } from '../errors';

const backendErrorText = (t: (key: string) => string, error: BackendError) => {
  const { code, msg } = error?.data?.error || {};
  const translationKey = 'error:error.' + code;
  return code && t(translationKey) !== translationKey.replace(/^error:/, '')
    ? t(translationKey)
    : msg || t('error:something-went-wrong');
};

const lastShownBackendError = { error: '', time: 0, expiry: 10_000 };

const ignoreError = (error: BackendError) => {
  const { code } = error?.data?.error || {};
  return code === 1091;
};

export const backendError = (
  t: (key: string) => string,
  error: BackendError,
  ignoreDuplicate: boolean,
) => {
  const text = backendErrorText(t, error);
  if (
    !ignoreDuplicate &&
    lastShownBackendError.error === text &&
    lastShownBackendError.time + lastShownBackendError.expiry > Date.now()
  )
    return;

  if (ignoreError(error)) return;

  lastShownBackendError.time = Date.now();
  lastShownBackendError.error = text;
  getToastUi().error(text);
};

export function useToast(): ReturnType<typeof getToastUi> & {
  backendError: (error?: BackendError, ignoreDuplicate?: boolean) => void;
} {
  const { t } = useTranslation<'error'>('error');
  return {
    ...getToastUi(),
    backendError: (error: BackendError, ignoreDuplicate: boolean) =>
      backendError(t, error, ignoreDuplicate),
  };
}
