// Dependencies
import React from 'react';
import { format } from 'date-fns';

// Styled Components
import * as styled from './styles';

const DateLabel = ({
  date = new Date()
}) => (
  <styled.Layout>
    <styled.Value>
      {format(date, 'p')}
    </styled.Value>
    <styled.Value>
      {format(date, 'PP')}
    </styled.Value>
  </styled.Layout>
);

export default DateLabel;
