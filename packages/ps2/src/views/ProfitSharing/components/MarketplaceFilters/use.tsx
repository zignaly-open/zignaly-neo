import React, { useCallback } from 'react';
import { TextFilter, ZigFiltersType, ZigRisk, getRisk } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVICES_COINS } from './contants';
import { getPeriodCountFromDays } from './util';
import { useRisks, useFilteredCollection } from '@zignaly-open/ui';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

export const useServiceFilters = (services: MarketplaceService[]) => {
  const { t } = useTranslation('marketplace');
  const risks = useRisks();

  const renderRisk = useCallback(
    (zrisk: number) => (
      <ZigRisk
        value={zrisk}
        width={30}
        height={16}
        sx={{ flexDirection: 'row', gap: '10px' }}
      />
    ),
    [risks],
  );

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

    const returnsPeriods = [
      'pnlPercent180t',
      'pnlPercent90t',
      // Add 1M option if no zscore. Otherwise 1M is always showed because enough space on mobile.
      ...(isFeatureOn(Features.ZScore) ? ['pnlPercent30t'] : []),
    ];

    return [
      {
        id: 'pnlPeriod',
        value: 'pnlPercent180t',
        type: 'select',
        options: returnsPeriods.map((o) => {
          const days = parseInt(o.match(/\d+/)[0]);
          const { period, count } = getPeriodCountFromDays(days);
          return {
            value: o,
            label: t(`table.n-${period}s-pnl`, {
              count,
            }),
          };
        }),
        label: t('filters.period-pnl'),
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
      ...(isFeatureOn(Features.ZScore)
        ? [
            {
              type: 'checkbox',
              value: null,
              label: t('table.risk'),
              options: risks.map((risk) => ({
                value: risk.id,
                label: renderRisk(risk.zrisk),
              })),
              id: 'risk',
              primary: true,
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
          ]
        : []),
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
              primary: !isFeatureOn(Features.ZScore),
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
  }, [t, services, risks]);
};

export const useFilteredServices = (
  services: MarketplaceService[],
  filters: ZigFiltersType,
  searchFilter = '',
) => {
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

  const risks = useRisks();
  const filterColumnMap = useCallback(
    (service: MarketplaceService) => ({
      returns: +service.pnlPercent180t,
      coin: service.ssc,
      type: service.geekMode.isSpotOnly ? 'spot' : 'futures',
      fee: service.successFee,
      exchange: service.exchange,
      risk: getRisk(service.zrisk, risks).id,
      zscore: service.zscore,
      search: [service.name, service.ownerName],
    }),
    [],
  );

  return useFilteredCollection(services, fullFilters, filterColumnMap);
};
