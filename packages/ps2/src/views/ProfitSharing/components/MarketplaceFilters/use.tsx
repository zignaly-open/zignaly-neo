import React from 'react';
import { useMediaQuery } from '@mui/material';
import { ZigFiltersType, ZigRisk, filterFns, getRisk } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES_COINS } from './contants';
import { getMonthsFromColumnId } from './util';
import { useRisks } from '@zignaly-open/ui';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

export const useServiceFilters = (services: MarketplaceService[]) => {
  const { t } = useTranslation('marketplace');
  const risks = useRisks();
  const md = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return useMemo(() => {
    const coins = SERVICES_COINS.filter((coin) =>
      services.find((service) => service.ssc === coin),
    );

    const maxPnL = services.reduce((prev, current) => {
      return +current.pnlPercent180t > prev
        ? parseInt(current.pnlPercent180t)
        : prev;
    }, 100);

    const exchanges = services.reduce((prev, current) => {
      return prev.includes(current.exchange)
        ? prev
        : [...prev, current.exchange];
    }, []);

    const returnsPeriods = [];
    if (isFeatureOn(Features.ZScore) || !lg) {
      returnsPeriods.push('pnlPercent180t', 'pnlPercent90t');
      if (isFeatureOn(Features.ZScore) && !lg) {
        returnsPeriods.push('pnlPercent30t');
      }
    }

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
        options: risks.map((risk) => ({
          value: risk.id,
          label: (
            <ZigRisk
              value={risk.zrisk}
              width={30}
              height={16}
              sx={{ flexDirection: 'row', gap: '10px' }}
            />
          ),
        })),
        id: 'risk',
        primary: true,
      },
      ...(returnsPeriods.length > 1
        ? [
            {
              id: 'pnlPeriod',
              value: 'pnlPercent180t',
              type: 'select',
              options: returnsPeriods.map((o) => ({
                value: o,
                label: t(
                  md
                    ? lg
                      ? 'table.n-months'
                      : 'table.n-months-mobile'
                    : 'table.n-months-pnl',
                  {
                    count: getMonthsFromColumnId(o),
                  },
                ),
              })),
              label: t('filters.period-pnl'),
              primary: true,
              mobile: true,
            },
          ]
        : []),
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
                label: exchange.charAt(0).toUpperCase() + exchange.slice(1),
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
  }, [t, services, risks, md, lg]);
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
            const serviceType = service.geekMode.isSpotOnly
              ? 'spot'
              : 'futures';
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
