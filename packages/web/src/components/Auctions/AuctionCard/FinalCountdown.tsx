import { Typography } from 'zignaly-ui';
import React, { useCallback } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TimeIcon } from 'images/time.svg';
import { Box } from '@mui/system';

// It's the final countdown
const FinalCountdown: React.FC<{ date: Date }> = ({ date }) => {
  const renderer = useCallback(
    ({
      hours,
      minutes,
      seconds,
      completed,
    }: {
      hours: number;
      minutes: number;
      seconds: number;
      completed: boolean;
    }) => {
      if (completed) return null;
      return (
        <Typography variant={'h1'} color={'greenGraph'}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Typography>
      );
    },
    [],
  );
  return (
    <Box display='flex' alignItems='center'>
      <TimeIcon style={{ marginTop: '-3px' }} />
      <Countdown date={date} renderer={renderer} />
    </Box>
  );
};

export default FinalCountdown;
