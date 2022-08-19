/* eslint-disable i18next/no-literal-string */
import { Typography } from '@zignaly-open/ui';
import React, { useCallback } from 'react';
import Countdown from 'react-countdown';

const ClaimCountdown: React.FC<{ date: Date; started: boolean }> = ({
  date,
  started,
}) => {
  const renderer = useCallback(
    ({
      days,
      hours,
      minutes,
      seconds,
    }: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      completed: boolean;
    }) => {
      return (
        <Typography variant={'h5'} color='neutral150'>
          {(days * 24 + hours).toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Typography>
      );
    },
    [date, started],
  );

  return <Countdown date={date} renderer={renderer} />;
};

export default ClaimCountdown;
