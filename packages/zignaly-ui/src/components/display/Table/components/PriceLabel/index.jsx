// Dependencies
import React from 'react';
import NumberFormat from 'react-number-format';

// Styled Components
import * as styled from './styles';

const PriceLabel = ({
  value = 0,
  token = 'USDT',
  bottomElement = null
}) => (
  <styled.Layout>
    <styled.Value>
      {(typeof value === 'number' || typeof value === 'bigint') ? (
        <NumberFormat
          value={value}
          displayType={'text'}
          thousandSeparator={true}
        />
      ) : value}
      <styled.Token>{token}</styled.Token>
    </styled.Value>
    {bottomElement && bottomElement}
  </styled.Layout>
);

export default PriceLabel;
