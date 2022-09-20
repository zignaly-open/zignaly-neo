/* eslint-disable i18next/no-literal-string */
import { Typography } from '@zignaly-open/ui';
import React from 'react';
import Countdown from 'react-countdown';
import { ReactComponent as TimeIcon } from 'assets/icons/time.svg';
import { styled } from '@mui/material/styles';

const CountdownContainer = styled('div')<{ color: string }>`
  display: flex;
  align-items: center;
  color: ${({ theme, color }) => theme[color]};
`;

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const color = completed ? 'neutral500' : 'greenGraph';

  return (
    <CountdownContainer color={color}>
      <TimeIcon style={{ marginTop: '-4px' }} />
      <Typography variant={'h1'}>
        {(days * 24 + hours).toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Typography>
    </CountdownContainer>
  );
};

// It's the final countdown
const FinalCountdown: React.FC<{ date: Date; started: boolean }> = ({
  date,
}) => {
  return <Countdown key={date.toString()} date={date} renderer={renderer} />;
};

export default FinalCountdown;
