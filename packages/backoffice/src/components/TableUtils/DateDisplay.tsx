import { ZigTypography } from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { format } from 'date-fns';

const DateDisplay: React.FC<{ date: string }> = ({ date }) => {
  const dateObject = useMemo(() => new Date(date), [date]);

  return (
    <ZigTypography>
      {format(dateObject, 'PP')}
      <br />
      {format(dateObject, 'p')}
    </ZigTypography>
  );
};

export default DateDisplay;
