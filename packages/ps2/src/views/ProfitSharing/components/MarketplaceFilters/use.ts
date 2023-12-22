import { useMediaQuery, useTheme } from '@mui/material';
import { ZigFiltersType, filterFns } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';
import { PersistTableDataPruned } from 'apis/settings/types';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_PERIOD,
  DEFAULT_SORTING_ID,
  RETURNS_PERIODS,
  SERVICES_COINS,
} from './contants';
import { getMonthsFromColumnId } from './util';

export const useServiceFilters = (services: MarketplaceService[]) => {
  const { t } = useTranslation('marketplace');
  const coins = SERVICES_COINS.filter((coin) =>
    services.find((service) => service.ssc === coin),
  );
  const maxPnL = services.reduce((prev, current) => {
    return +current.pnlPercent180t > prev
      ? parseInt(current.pnlPercent180t)
      : prev;
  }, 100);

  return useMemo(() => {
    return [
      {
        id: 'pnlPeriod',
        value: DEFAULT_PERIOD,
        type: 'select',
        options: RETURNS_PERIODS.map((o) => ({
          value: o,
          label: t('table.n-months', { count: getMonthsFromColumnId(o) }),
        })),
        label: t('filters.period'),
        mobile: true,
      },
      {
        type: 'slider',
        value: [null, null],
        label: t('filters.returns-months', { count: 6 }),
        allowNoMin: true,
        allowNoMax: true,
        min: 0,
        max: maxPnL,
        id: 'returns',
        primary: true,
      },
      {
        type: 'checkbox',
        value: null,
        label: t('filters.coins'),
        options: coins.map((coin) => ({ value: coin, label: coin })),
        id: 'coin',
        primary: true,
      },
      {
        type: 'checkbox',
        label: t('filters.type'),
        options: [
          { value: 'spot', label: t('filters.spot') },
          { value: 'futures', label: t('filters.futures') },
        ],
        value: null,
        id: 'type',
      },
      {
        type: 'slider',
        value: [0, 75],
        label: t('filters.fee'),
        min: 0,
        max: 75,
        id: 'fee',
      },
    ] as ZigFiltersType;
  }, [t, coins, maxPnL]);
};

export const useFilteredServices = (
  services: MarketplaceService[],
  filters: ZigFiltersType,
  searchFilter = '',
) => {
  return useMemo(() => {
    return services.filter((service) => {
      return (
        filters?.every((filter) => {
          if (filter.id === 'returns') {
            return filterFns.inNumberRange(
              +service.pnlPercent180t,
              filter.value as [number, number],
            );
          } else if (filter.id === 'coin') {
            return (
              !filter.value || (filter.value as string[]).includes(service.ssc)
            );
          } else if (filter.id === 'type') {
            const serviceType = service.type.split('_')[1];
            return (
              !filter.value || (filter.value as string[]).includes(serviceType)
            );
          } else if (filter.id === 'fee') {
            return filterFns.inNumberRange(
              service.successFee,
              filter.value as [number, number],
            );
          }
          return true;
        }) &&
        (filterFns.includesString(service.name, searchFilter) ||
          filterFns.includesString(service.ownerName, searchFilter))
      );
    });
  }, [services, filters, searchFilter]);
};

/**
 * Reset sorted column if it's no longer displayed
 */
export const useReturnsPeriod = (tablePersist: PersistTableDataPruned) => {
  const returnsPeriod =
    tablePersist.filters.find((f) => f.id === 'pnlPeriod')?.value ??
    DEFAULT_PERIOD;

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  const sortingPeriod = tablePersist.sorting?.[0]?.id;
  useEffect(() => {
    if (sortingPeriod && sortingPeriod !== returnsPeriod) {
      if (
        (!md && returnsPeriod === 'pnlPercent180t') ||
        (!lg && returnsPeriod === 'pnlPercent90t')
      ) {
        tablePersist.sortTable([{ id: DEFAULT_SORTING_ID, desc: true }]);
      }
    }
  }, [sortingPeriod, returnsPeriod, md, lg]);

  return returnsPeriod;
};
