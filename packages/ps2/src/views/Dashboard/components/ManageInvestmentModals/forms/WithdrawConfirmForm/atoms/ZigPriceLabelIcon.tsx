import { Box } from '@mui/material';
import { ZigCoinIcon, ZigPriceLabel } from '@zignaly-open/ui';
import {} from '@zignaly-open/ui/icons';
import React from 'react';

export const ZigPriceLabelIcon = ({
  amount,
  coin,
  iconBucket,
  precision,
  id,
}: {
  amount: string | number;
  coin: string;
  iconBucket?: string;
  precision?: number;
  id?: string;
}) => {
  return (
    <Box display='flex' gap={1} alignItems='center' justifyContent='center'>
      <ZigCoinIcon coin={coin} bucket={iconBucket} id={id && `${id}-icon`} />
      <ZigPriceLabel
        id={id}
        noWrap
        component='span'
        color='neutral100'
        variant='bigNumber'
        value={+amount}
        coin={coin}
        precision={precision}
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
