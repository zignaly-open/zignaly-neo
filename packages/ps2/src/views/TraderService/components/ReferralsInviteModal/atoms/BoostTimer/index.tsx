import React from 'react';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ZigClockIcon, ZigTypography } from '@zignaly-open/ui';

const BoostTimer = ({
  boostEndsDate,
  currentDate,
}: {
  boostEndsDate: Date;
  currentDate: Date;
}) => {
  const days = differenceInDays(boostEndsDate, currentDate);
  const hours = differenceInHours(boostEndsDate, currentDate) % 24;
  const minutes = differenceInMinutes(boostEndsDate, currentDate) % 60;
  const { t } = useTranslation('referrals-trader');

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap='9px'
      mt='11px'
      className='boost-timer'
    >
      <ZigClockIcon color='#e93ea7' />
      <ZigTypography color='#e93ea7' variant='h4' fontWeight={400}>
        {`${t('day', { count: days })}, ${t('hour', {
          count: hours,
        })}, ${t('minute', { count: minutes })}`}
      </ZigTypography>
    </Box>
  );
};

export default BoostTimer;
