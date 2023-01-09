import { Box } from '@mui/material';
import { ZigCoinIcon, ZigPriceLabel } from '@zignaly-open/ui';
import React from 'react';

export const ZigPriceLabelIcon = ({
  amount,
  coin,
  iconBucket,
}: {
  amount: string | number;
  coin: string;
  iconBucket?: string;
}) => {
  return (
    <Box display='flex' gap={1} alignItems='center' justifyContent='center'>
      <ZigCoinIcon name={coin} coin={coin} bucket={iconBucket} />
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
