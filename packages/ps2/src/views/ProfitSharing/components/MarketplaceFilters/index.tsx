import { ZigFilters, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { MarketplaceFiltersProps } from './types';
import { useTranslation } from 'react-i18next';
import { getFilters } from './util';

const MarketplaceFilters = ({
  filters,
  services,
  onFiltersChange,
  searchFilter,
  onSearchChange,
}: MarketplaceFiltersProps) => {
  const { t } = useTranslation('marketplace');

  return (
    <ZigFilters
      leftComponent={
        <ZigTypography variant='h2'>
          {t('n-profit-sharing-services', {
            count: services.length,
          })}
        </ZigTypography>
      }
      filters={filters}
      defaultFilters={getFilters(t)}
      onChange={onFiltersChange}
      search={searchFilter}
      onSearchChange={onSearchChange}
      sx={{ mb: '28px' }}
      label={t('investment-preferences')}
    />
  );
};

export default MarketplaceFilters;
