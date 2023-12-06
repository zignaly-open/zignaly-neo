import { ZigFilters, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { MarketplaceFiltersProps } from './types';
import { useTranslation } from 'react-i18next';
import { useMarketplaceFilters } from './util';

const MarketplaceFilters = ({
  filters,
  resultsCount,
  onFiltersChange,
  searchFilter,
  onSearchChange,
}: MarketplaceFiltersProps) => {
  const { t } = useTranslation('marketplace');
  const defaultFilters = useMarketplaceFilters();

  return (
    <ZigFilters
      leftComponent={
        <ZigTypography variant='h2'>
          {t('n-profit-sharing-services', {
            count: resultsCount,
          })}
        </ZigTypography>
      }
      filters={filters}
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
