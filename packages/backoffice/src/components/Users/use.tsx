import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { UserAccessLevel } from '../../apis/users/types';

export const useAccessLevelOptions = () => {
  const { t } = useTranslation('users');
  return useMemo<{ value: string; label: string }[]>(
    () => [
      { value: '', label: t('common:all') },
      ...Object.entries(UserAccessLevel)
        .filter(([value]) => !Number.isNaN(+value))
        .map(([value, label]) => ({
          label: t('accessLevels.' + label),
          value,
        })),
    ],
    [t],
  );
};
