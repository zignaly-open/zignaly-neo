import { ZigFilters, ZigSelect, ZigTypography } from '@zignaly-open/ui';
import React, { useCallback, useState } from 'react';
import { MarketplaceFiltersProps } from './types';
import { useTranslation } from 'react-i18next';
import { TableId } from 'apis/settings/types';
import { useMediaQuery, useTheme } from '@mui/material';
import { RETURNS_PERIODS } from './contants';

const MarketplaceFilters = ({
  filters,
  defaultFilters,
  resultsCount,
  onFiltersChange,
  searchFilter,
  onSearchChange,
  returnsPeriod,
  onReturnsPeriodChange,
}: MarketplaceFiltersProps) => {
  const { t } = useTranslation('marketplace');
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const ReturnsPicker = useCallback(() => {
    const options = RETURNS_PERIODS.map((n) => ({
      value: n,
      label: t('table.n-months', { count: n }),
    }));

    return (
      <ZigSelect
        options={options}
        value={returnsPeriod}
        onChange={(value) => onReturnsPeriodChange(value)}
        small
        sx={{ minWidth: 120 }}
      />
    );
  }, [t, returnsPeriod]);

  return (
    <ZigFilters
      leftComponent={
        !md ? (
          <ReturnsPicker />
        ) : (
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
        )
      }
      filters={filters}
      defaultFilters={defaultFilters}
      onChange={onFiltersChange}
      search={searchFilter}
      onSearchChange={onSearchChange}
      sx={{ mb: { xs: 2, sm: 3.5 } }}
      prefixId={TableId.Marketplace}
    />
  );
};

export default MarketplaceFilters;
