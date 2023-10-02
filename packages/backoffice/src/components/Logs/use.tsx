import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LogEntryActions } from '../../apis/logs/types';

export const useLogActionOptions = () => {
  const { t } = useTranslation('logs');
  return useMemo<
    { value: LogEntryActions | ''; label: string | JSX.Element }[]
  >(
    () => [
      { value: '', label: t('common:all') },
      ...Object.entries<string>(t('statuses', { returnObjects: true })).map(
        ([value, label]) => ({
          value: value as unknown as LogEntryActions,
          label: label,
        }),
      ),
    ],
    [t],
  );
};
