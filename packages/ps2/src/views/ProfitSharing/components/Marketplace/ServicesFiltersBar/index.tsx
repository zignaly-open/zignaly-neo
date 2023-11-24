import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';

const ServicesFiltersBar = ({
  count,
  filters,
  onChange,
}): { count: number } => {
  const { t } = useTranslation('marketplace');
  return (
    <Box display='flex'>
      <ZigTypography variant='h2'>
        {t('n-profit-sharing-services', { count })}
      </ZigTypography>
      <ZigTypography variant='h4' fontWeight={400}>
        {t('investment-preferences')}
      </ZigTypography>
    </Box>
  );
};

export default ServicesFiltersBar;
