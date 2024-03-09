import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { formatLocalizedDate } from 'views/Dashboard/components/MyDashboard/util';

const DateLabel = ({ date, id }: { date: Date; id?: string }) => (
  <Box display={'flex'} flexDirection={'column'} id={id}>
    <ZigTypography
      className={'date__time'}
      variant={'body2'}
      fontWeight={'regular'}
      sx={{ textTransform: 'lowercase' }}
    >
      {formatLocalizedDate(date, 'p')}
    </ZigTypography>
    <ZigTypography
      className={'date__date'}
      variant={'body2'}
      fontWeight={'regular'}
    >
      {formatLocalizedDate(date, 'PP')}
    </ZigTypography>
  </Box>
);

export default DateLabel;
