import { useTranslation } from 'react-i18next';
import {
  TextFilter,
  useFilteredCollection,
  ZigFiltersType,
} from '@zignaly-open/ui';
import { useCallback, useMemo } from 'react';
import { Investor, Service } from '../../../../apis/service/types';
import { getServiceTotalFee } from '../../../../util/fee';
import { useActiveExchange } from '../../../../apis/user/use';
import {
  ConnectionStateLabelId,
  connectionStateName,
} from '../ConnectionStateLabel/types';

export const useInvestorFilters = (
  investors: Investor[],
  serviceSuccessFee: number,
) => {
  const { t } = useTranslation('investors');

  return useMemo(
    () =>
      [
        {
          type: 'slider',
          value: [0, serviceSuccessFee],
          label: t('filters.success-fee'),
          min: 0,
          max: serviceSuccessFee,
          id: 'ownerSuccessFee',
          primary: true,
        },
        {
          type: 'checkbox',
          value: null,
          label: t('filters.status'),
          options: Object.entries(ConnectionStateLabelId).map(([, value]) => {
            return { label: t(connectionStateName[value]), value: value };
          }),
          id: 'status',
          primary: true,
        },
      ] as ZigFiltersType,
    [t, investors, serviceSuccessFee],
  );
};

export const useFilteredInvestors = (
  investors: Investor[],
  filters: ZigFiltersType,
  service: Service,
  searchFilter = '',
) => {
  const exchange = useActiveExchange();
  const fullFilters = useMemo(
    () => [
      ...filters,
      {
        id: 'search',
        type: 'text',
        value: searchFilter,
      } as TextFilter,
    ],
    [filters, searchFilter],
  );
  const filterColumnMap = useCallback(
    (investor: Investor) => ({
      status: investor.accountType,
      ownerSuccessFee: getServiceTotalFee(
        investor.ownerSuccessFee,
        service?.zglySuccessFee,
        investor.account_id === exchange.internalId ||
          investor.accountType === 'owner',
      ),
      search: [investor.email, investor.userId],
    }),
    [service],
  );

  return useFilteredCollection(investors, fullFilters, filterColumnMap);
};
