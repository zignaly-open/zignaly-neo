import { Box } from '@mui/material';
import { CoinIcon, ZigPriceLabel } from '@zignaly-open/ui';
import React from 'react';

const ZigPriceLabelIcon = ({
  amount,
  coin,
}: {
  amount: string | number;
  coin: string;
}) => {
  return (
    <Box display='flex' gap={1} alignItems='center' justifyContent='center'>
      <CoinIcon name={coin} coin={coin} />
      <ZigPriceLabel
        noWrap
        component='span'
        color='neutral100'
        variant='bigNumber'
        value={+amount}
        coin={coin}
        coinProps={{
          color: 'neutral400',
          variant: 'h3',
          component: 'span',
          fontWeight: 500,
        }}
      />
    </Box>
  );
};

export default ZigPriceLabelIcon;
