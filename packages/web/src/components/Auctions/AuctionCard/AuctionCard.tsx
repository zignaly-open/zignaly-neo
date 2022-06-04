import { useMutation, useQuery } from '@apollo/client';
import { Alert, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType, BasketItem } from '../../../../../types/src/Auction';
import { BID_AUCTION, GET_AUCTIONS } from '../queries';
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
  id: AuctionType['id'];
}> = ({ id }) => {
  const { t } = useTranslation('auction');
  const { loading, error, data } = useQuery(GET_AUCTIONS, {
    variables: { id },
  });

  const [mutate] = useMutation(BID_AUCTION);

  if (loading) {
    return (
      <Item>
        <Typography gutterBottom variant='h6' component='div'>
          XXXX
        </Typography>

        {/*{[1,2,3].basket.map((item: BasketItem) => (*/}
        {/*    <AuctionBasketItem key={item.ticker} item={item} />*/}
        {/*))}*/}

        <Typography color='text.secondary'>
          {t('for-a-total-value-of')}{' '}
          <Typography
            variant={'body2'}
            fontWeight={600}
            color='text.main'
            component='span'
          >
            $100
          </Typography>
        </Typography>
      </Item>
    );
  }

  if (error) return <Alert severity='error'>Error! ${error.message}</Alert>;

  const auction = data.auctions[0];

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
      <Button
        variant={'contained'}
        size='large'
        onClick={() =>
          mutate({
            variables: { id: auction.id, value: auction.bids[0].value + 1 },
          })
        }
      >
        {t('bid')}
      </Button>
    </Item>
  );
};

export default AuctionCard;
