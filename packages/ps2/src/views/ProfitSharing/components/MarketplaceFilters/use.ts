import { useMediaQuery, useTheme } from '@mui/material';
import { ZigFiltersType, filterFns, getRisk } from '@zignaly-open/ui';
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
import { useRisks } from '@zignaly-open/ui';

export const useServiceFilters = (services: MarketplaceService[]) => {
  const { t } = useTranslation('marketplace');
  const risks = useRisks();

  const coins = SERVICES_COINS.filter((coin) =>
    services.find((service) => service.ssc === coin),
  );
  const maxPnL = services.reduce((prev, current) => {
    return +current.pnlPercent180t > prev
      ? parseInt(current.pnlPercent180t)
      : prev;
  }, 100);
  const exchanges = services.reduce((prev, current) => {
    return prev.includes(current.exchange) ? prev : [...prev, current.exchange];
  }, []);

  return useMemo(() => {
    return [
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
        label: t('table.risk'),
        options: risks.map((risk) => ({ value: risk.id, label: risk.label })),
        id: 'risk',
        primary: true,
      },
      {
        id: 'pnlPeriod',
        value: DEFAULT_PERIOD,
        type: 'select',
        options: RETURNS_PERIODS.map((o) => ({
          value: o,
          label: t('table.n-months-pnl', { count: getMonthsFromColumnId(o) }),
        })),
        label: t('filters.period-pnl'),
        primary: true,
        mobile: true,
      },
      {
        type: 'slider',
        value: [0, 100],
        label: t('table.zscore'),
        showPct: false,
        min: 0,
        max: 100,
        id: 'zscore',
      },
      {
        type: 'slider',
        value: [0, 75],
        label: t('filters.fee'),
        min: 0,
        max: 75,
        id: 'fee',
      },
      ...(exchanges.length > 1
        ? [
            {
              type: 'checkbox',
              value: null,
              label: t('filters.exchange'),
              options: exchanges.map((exchange) => ({
                value: exchange,
                label: exchange,
              })),
              id: 'exchange',
            },
          ]
        : []),
      ...(coins.length > 1
        ? [
            {
              type: 'checkbox',
              value: null,
              label: t('filters.coins'),
              options: coins.map((coin) => ({ value: coin, label: coin })),
              id: 'coin',
            },
          ]
        : []),
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
    ] as ZigFiltersType;
  }, [t, coins, maxPnL]);
};

export const useFilteredServices = (
  services: MarketplaceService[],
  filters: ZigFiltersType,
  searchFilter = '',
) => {
  const risks = useRisks();

  return useMemo(() => {
    return services.filter((service) => {
      return (
        filters?.every((filter) => {
          if (filter.id === 'returns') {
            return filterFns.inNumberRange(
              filter.value as [number, number],
              +service.pnlPercent180t,
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
              filter.value as [number, number],
              service.successFee,
            );
          } else if (filter.id === 'exchange') {
            return (
              !filter.value ||
              (filter.value as string[]).includes(service.exchange)
            );
          } else if (filter.id === 'risk') {
            const serviceRisk = getRisk(service.zrisk, risks);

            return (
              !(filter.value as number[])?.length ||
              (filter.value as number[])?.includes(serviceRisk.id)
            );
          } else if (filter.id === 'zscore') {
            return filterFns.inNumberRange(
              filter.value as [number, number],
              service.zscore,
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
  // console.log(sortingPeriod, returnsPeriod);
  // useEffect(() => {
  //   if (
  //     sortingPeriod &&
  //     RETURNS_PERIODS.includes(sortingPeriod) &&
  //     sortingPeriod !== returnsPeriod
  //   ) {
  //     // If sorting by returns period, and the period is no longer displayed, reset sorting
  //     if (
  //       (!md && returnsPeriod === 'pnlPercent180t') ||
  //       (!lg && returnsPeriod === 'pnlPercent90t')
  //     ) {
  //       // Pick selected pnl period, or the default column if it's not one from the list
  //       const newSortingId = RETURNS_PERIODS.includes(DEFAULT_SORTING_ID)
  //         ? returnsPeriod
  //         : DEFAULT_SORTING_ID;
  //       tablePersist.sortTable([
  //         {
  //           id: newSortingId,
  //           desc: true,
  //         },
  //       ]);
  //     }
  //   }
  // }, [sortingPeriod, returnsPeriod, md, lg]);

  return returnsPeriod;
};
