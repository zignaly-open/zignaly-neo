import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType, BasketItem } from '../../../../../types/src/Auction';
import AuctionBasketItem from './AuctionBasketItem';

// states
// - winning
// - winning
// - inactive
// - generic
// - outbid

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2.5),
  boxShadow: '0 0 0 7px #f00 inset',
  color: theme.palette.text.secondary,
}));

const AuctionCard: React.FC<{
  auction: AuctionType;
  onBid: () => void;
}> = ({ auction, onBid }) => {
  const { t } = useTranslation('auction');

  return (
    <Item>
      <Typography gutterBottom variant='h6' component='div'>
        {auction.title}
      </Typography>
      <Box sx={{ marginBottom: 1 }}>
        <Typography color='text.secondary'>{auction.description}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        {auction.basket.map((item: BasketItem) => (
          <AuctionBasketItem key={item.ticker} item={item} />
        ))}
      </Box>
      <Typography color='text.secondary'>
        {t('for-a-total-value-of')}{' '}
        <Typography
          color='primary'
          component='span'
          fontWeight={500}
          variant='body2'
        >
          $100
          {/*TODO*/}
        </Typography>
      </Typography>
      Current bid: Winning bid:
      <ul>{auction.bids[0].value}</ul>
      User who bid
      <Button variant={'contained'} size='large' onClick={onBid}>
        {t('bid')}
      </Button>
    </Item>
  );
};

export default AuctionCard;
