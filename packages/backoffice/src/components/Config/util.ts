import { useSaveCurrentWlConfig } from './use';
import { useToast } from '@zignaly-open/ui';
import { WhitelabelBackendConfig } from '../../apis/config/types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export function useSaveConfig(
  transform?: (
    v: Partial<WhitelabelBackendConfig>,
  ) => Partial<WhitelabelBackendConfig>,
) {
  const { t } = useTranslation('config');
  const [save, { isLoading }] = useSaveCurrentWlConfig();
  const toast = useToast();

  const submit = useCallback(
    (values: Partial<WhitelabelBackendConfig>) => {
      save(transform ? transform(values) : values)
        .unwrap()
        .then(() => {
          toast.success(t('saved'));
        })
        .catch((e) => {
          toast.error(
            t('failed') +
              ' ' +
              (e?.data?.error?.msg
                ? t(`error:error.${e?.data?.error?.msg}`)
                : ''),
          );
        });
    },
    [t],
  );

  return {
    isLoading,
    submit,
  };
}
