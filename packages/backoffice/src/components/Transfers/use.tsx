import React, { useMemo } from 'react';
import {
  DepositStatuses,
  TransferFilterType,
  WithdrawalStatuses,
} from '../../apis/transfers/types';
import { ZigTypography } from '@zignaly-open/ui';
import { depositStatusColorMap, withdrawalStatusColorMap } from './constants';
import { useTranslation } from 'react-i18next';

export const useOperatorOptions = () => {
  return useMemo<{ value: TransferFilterType['operator']; label: string }[]>(
    () => [
      { value: 'eq', label: '=' },
      { value: 'gt', label: '>' },
      { value: 'lt', label: '<' },
      { value: 'gte', label: '>=' },
      { value: 'lte', label: '<=' },
    ],
    [],
  );
};

export const useDepositStatusOptions = () => {
  const { t } = useTranslation('transfers');
  return useMemo<{ value: DepositStatuses | ''; label: JSX.Element }[]>(
    () => [
      { value: '', label: t('common:all') },
      ...Object.entries(t('depositStatuses', { returnObjects: true })).map(
        ([value, label]) => ({
          value: value as unknown as DepositStatuses,
          label: (
            <ZigTypography color={depositStatusColorMap[value]}>
              {label}
            </ZigTypography>
          ),
        }),
      ),
    ],
    [t],
  );
};

export const useWithdrawalStatusOptions = () => {
  const { t } = useTranslation('transfers');
  return useMemo<{ value: WithdrawalStatuses | ''; label: JSX.Element }[]>(
    () => [
      { value: '', label: t('common:all') },
      ...Object.entries(t('withdrawalStatuses', { returnObjects: true })).map(
        ([value, label]) => ({
          value: value as unknown as WithdrawalStatuses,
          label: (
            <ZigTypography color={withdrawalStatusColorMap[value]}>
              {label}
            </ZigTypography>
          ),
        }),
      ),
    ],
    [t],
  );
};
