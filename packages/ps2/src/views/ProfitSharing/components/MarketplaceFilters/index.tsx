import { ZigFilters, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { MarketplaceFiltersProps } from './types';
import { useTranslation } from 'react-i18next';
import { TableId } from 'apis/settings/types';

const MarketplaceFilters = ({
  filters,
  defaultFilters,
  resultsCount,
  onFiltersChange,
  searchFilter,
  onSearchChange,
}: MarketplaceFiltersProps) => {
  const { t } = useTranslation('marketplace');

  return (
    <ZigFilters
      leftComponent={
        <ZigTypography
          variant='h2'
          fontWeight={400}
          id='marketplace__services-count'
          whiteSpace={'nowrap'}
        >
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
      prefixId={TableId.Marketplace}
    />
  );
};

export default MarketplaceFilters;
