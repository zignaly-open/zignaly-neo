import { Typography } from 'zignaly-ui';
import React, { useCallback } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';

// It's the final countdown
const FinalCountdown: React.FC<{ date: Date }> = ({ date }) => {
  const { t } = useTranslation('auction');
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
        <Typography
          fontSize={24}
          variant={'body2'}
          color={'primary'}
          marginBottom={3}
        >
          {t('auction:remaining-time', {
            h: hours,
            m: minutes.toString().padStart(2, '0'),
            s: seconds.toString().padStart(2, '0'),
          })}
        </Typography>
      );
    },
    [],
  );
  return <Countdown date={date} renderer={renderer} />;
};

export default FinalCountdown;
