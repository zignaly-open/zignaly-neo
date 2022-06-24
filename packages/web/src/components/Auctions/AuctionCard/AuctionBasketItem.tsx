import { Typography } from 'zignaly-ui';
import React from 'react';
import { BasketItem } from '@zigraffle/shared/types';

const AuctionBasketItem: React.FC<{ item: BasketItem }> = ({
  item: { ticker, amount },
}) => {
  return (
    <Typography color='primary' fontWeight={600} fontSize={18} variant='body2'>
      {ticker} &times; {amount}
    </Typography>
  );
};

export default AuctionBasketItem;
