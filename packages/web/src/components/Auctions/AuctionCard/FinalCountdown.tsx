import { Typography } from 'zignaly-ui';
import React, { useCallback } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TimeIcon } from 'images/time.svg';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

const CountdownContainer = styled('div')<{ color: string }>`
  display: flex;
  align-items: center;
  color: ${({ theme, color }) => theme[color]};
`;

// It's the final countdown
const FinalCountdown: React.FC<{ date: Date; started: boolean }> = ({
  date,
  started,
}) => {
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
      const color = started
        ? completed
          ? 'redGraphOrError'
          : 'greenGraph'
        : 'neutral300';

      return (
        <CountdownContainer color={color}>
          <TimeIcon style={{ marginTop: '-4px' }} />
          <Typography variant={'h1'}>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </Typography>
        </CountdownContainer>
      );
    },
    [],
  );

  return <Countdown date={date} renderer={renderer} />;
};

export default FinalCountdown;
