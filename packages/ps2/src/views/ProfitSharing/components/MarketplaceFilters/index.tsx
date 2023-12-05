import {
  ZigFilters,
  ZigFiltersType,
  ZigTypography,
  filterFns,
  loadFilters,
} from '@zignaly-open/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { MarketplaceFiltersProps } from './types';
import { useTranslation } from 'react-i18next';

const MarketplaceFilters = ({
  filters,
  services,
  onFiltersChange,
  onDataFiltered,
  searchFilter,
  onSearchChange,
}: MarketplaceFiltersProps) => {
  const { t } = useTranslation('marketplace');

  const coins = ['USDT', 'USDC', 'BNB', 'ETH', 'BTC'];
  const defaultFilters: ZigFiltersType = [
    {
      type: 'slider',
      value: [null, null],
      label: t('filters.returns-months', { count: 6 }),
      allowNoMin: true,
      allowNoMax: true,
      min: 0,
      max: 100,
      id: 'returns',
      showInBar: true,
    },
    {
      type: 'select',
      value: null,
      label: t('filters.coin'),
      options: [
        { value: null, label: t('filters.all') },
        ...coins.map((coin) => ({ value: coin, label: coin })),
      ],
      id: 'coin',
      showInBar: true,
    },
    {
      type: 'checkbox',
      label: t('filters.type'),
      options: [
        { value: 'spot', label: t('filters.spot') },
        { value: 'futures', label: t('filters.futures') },
      ],
      value: ['spot', 'futures'],
      id: 'type',
    },
    {
      type: 'slider',
      value: [0, 100],
      label: t('filters.fee'),
      min: 0,
      max: 100,
      id: 'fee',
    },
  ];

  const loadedFilters = useMemo(
    () => loadFilters(defaultFilters, filters),
    [filters],
  );
  const [count, setCount] = useState(null);

  // Filtering manually instead of via react-table/ZigTable allows having access to the filtered services
  // to display results count.
  useEffect(() => {
    const filteredServices = services.filter((service) => {
      return loadedFilters?.every((filter) => {
        if (filter.id === 'returns') {
          return filterFns.inNumberRange(
            +service.pnlPercent180t,
            filter.value as [number, number],
          );
        } else if (filter.id === 'coin') {
          return !filter.value || service.ssc === filter.value;
        } else if (filter.id === 'type') {
          const serviceType = service.type.split('_')[1];
          return (filter.value as string[]).includes(serviceType);
        } else if (filter.id === 'fee') {
          return filterFns.inNumberRange(
            service.successFee,
            filter.value as [number, number],
          );
        }
        return true;
      });
    });
    onDataFiltered(filteredServices);
    setCount(filteredServices.length);
  }, [services, loadedFilters]);

  return (
    <ZigFilters
      leftComponent={
        <ZigTypography variant='h2'>
          {t('n-profit-sharing-services', {
            count,
          })}
        </ZigTypography>
      }
      filters={loadedFilters}
      defaultFilters={defaultFilters}
      onChange={onFiltersChange}
      search={searchFilter}
      onSearchChange={onSearchChange}
      sx={{ mb: '28px' }}
      label={t('investment-preferences')}
    />
  );
};

export default MarketplaceFilters;
