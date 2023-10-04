import { ArrowDownward } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const UserRate = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap='6px'
      mb='13px'
      id='referrals-invite-modal__your-rate'
    >
      <ZigTypography variant='h3' color='paleBlue'>
        {t('your-rate')}
      </ZigTypography>
      <ArrowDownward style={{ color: 'paleBlue', height: '20px' }} />
    </Box>
  );
};
