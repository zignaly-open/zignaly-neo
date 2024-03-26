import { ZigTypography } from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Box } from '@mui/material';

const DateDisplay: React.FC<{ date: string }> = ({ date }) => {
  const dateObject = useMemo(() => (date ? new Date(date) : ''), [date]);

  return dateObject ? (
    <Box display={'flex'} flexDirection={'column'}>
      <ZigTypography
        className={'date__time'}
        variant={'body2'}
        fontWeight={'regular'}
        sx={{ textTransform: 'lowercase' }}
      >
        {format(dateObject, 'p')}
      </ZigTypography>
      <ZigTypography
        className={'date__date'}
        variant={'body2'}
        fontWeight={'regular'}
      >
        {format(dateObject, 'PP')}
      </ZigTypography>
    </Box>
  ) : (
    <></>
  );
};

export default DateDisplay;
