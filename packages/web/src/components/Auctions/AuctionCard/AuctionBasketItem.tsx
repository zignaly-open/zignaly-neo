import Typography from '@mui/material/Typography';
import React from 'react';
import { BasketItem } from '../../../../../types/src/Auction';

const AuctionBasketItem: React.FC<{ item: BasketItem }> = ({
  item: { ticker, amount },
}) => {
  return (
    <Typography
      color='primary'
      component='span'
      fontWeight={500}
      fontSize={18}
      variant='body2'
    >
      {ticker} &times; {amount}
    </Typography>
  );
};

export default AuctionBasketItem;
