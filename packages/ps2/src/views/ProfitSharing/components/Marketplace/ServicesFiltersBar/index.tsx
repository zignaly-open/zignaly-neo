import React from 'react';
import { Box, Grid } from '@mui/material';
import { ZigFilters, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ServicesFiltersBarProps } from './types';

const ServicesFiltersBar = ({
  count,
  initialFilters,
  defaultFilters,
  onChange,
  search,
  onSearchChange,
}: ServicesFiltersBarProps) => {
  const { t } = useTranslation('marketplace');
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexWrap='wrap'
      gap={1}
      mb='28px'
    >
      <Box display={'flex'} flex={1} flexBasis={{ xs: '100%', md: 0 }}>
        <ZigTypography variant='h2'>
          {t('n-profit-sharing-services', { count })}
        </ZigTypography>
      </Box>
      <Box
        justifyContent='center'
        display='flex'
        gap={1}
        alignItems='center'
        flex={1}
        flexGrow={2}
        sx={{
          '> div': {
            justifyContent: 'center',
          },
        }}
      >
        <ZigFilters
          title={t('investment-preferences')}
          defaultFilters={defaultFilters}
          initialFilters={initialFilters}
          onChange={onChange}
          search={search}
          onSearchChange={onSearchChange}
        />
      </Box>

      <Box flex={1} />
    </Box>
  );
};

export default ServicesFiltersBar;
