import { useToast } from '@zignaly-open/ui';
import { WhitelabelBackendConfig } from '../../apis/config/types';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import {
  useSaveWlConfigMutation,
  useWlConfigQuery,
} from '../../apis/config/api';

export function useSaveConfig(
  wl: string,
  transform?: (
    v: Partial<WhitelabelBackendConfig>,
  ) => Partial<WhitelabelBackendConfig>,
) {
  const { t } = useTranslation('config');
  const { data: originalValue } = useWlConfigQuery(wl);
  const [action, { isLoading }] = useSaveWlConfigMutation();
  const toast = useToast();

  const submit = useCallback(
    (values: Partial<WhitelabelBackendConfig>) => {
      action({
        slug: wl,
        data: {
          ...(originalValue || {}),
          ...(transform ? transform(values) : values),
        } as WhitelabelBackendConfig,
      })
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
