import React from 'react';
import { Box } from '@mui/material';
import { ZigFilters, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ServicesFiltersBarProps } from './types';

const ServicesFiltersBar = ({
  count,
  filters,
  defaultFilters,
  onChange,
  search,
  onSearchChange,
}: ServicesFiltersBarProps) => {
  const { t } = useTranslation('marketplace');
  return (
    <Box display='flex'>
      <ZigTypography variant='h2'>
        {t('n-profit-sharing-services', { count })}
      </ZigTypography>
      <ZigTypography variant='h4' fontWeight={400}>
        {t('investment-preferences')}
      </ZigTypography>
      <ZigFilters
        defaultFilters={defaultFilters}
        initialFilters={filters}
        onChange={onChange}
        search={search}
        onSearchChange={onSearchChange}
      />
    </Box>
  );
};

export default ServicesFiltersBar;
