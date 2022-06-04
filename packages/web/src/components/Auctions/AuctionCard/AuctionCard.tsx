import { Avatar, Box, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { AuctionType, BasketItem } from '../../../../../types/src/Auction';
import AuctionBasketItem from './AuctionBasketItem';
import FinalCountdown from './FinalCountdown';

// states
// - winning
// - inactive
// - generic
// - outbid
//
const Item = styled(Paper)<{
  isActive: boolean;
  isWinning: boolean;
  isLosing: boolean;
}>(({ theme, isActive, isWinning, isLosing }) => ({
  backgroundColor: isWinning
    ? '#ebffea'
    : isLosing
    ? '#ffeaea'
    : isActive
    ? '#fff'
    : '#e5e5e5',
  padding: theme.spacing(2.5),
  filter: isActive ? 'unset' : 'grayscale(50%)',
  boxShadow: isWinning ? `0 0 0 3px #aaff99 inset` : 'unset',
  color: theme.palette.text.secondary,
}));

const CURL_SIZE = 0.5;

const GiftBox = styled(Box)<{ isWinning: boolean; isLosing: boolean }>`
  background: ${(props) =>
    props.isWinning ? '#0f950f' : props.isLosing ? '#950f0f' : '#eee'};
  margin-left: ${({ theme }) => theme.spacing(-2.5 - 2 * CURL_SIZE)};
  margin-right: ${({ theme }) => theme.spacing(-2.5 - 2 * CURL_SIZE)};
  position: relative;

  ${(props) =>
    (props.isWinning || props.isLosing) &&
    css`
      p,
      span {
        color: #fff !important;
      }
    `}

  &:after,
  &:before {
    content: '';
    border-style: solid;
    border-width: ${({ theme }) => theme.spacing(CURL_SIZE)};
    position: absolute;
  }

  &:after {
    bottom: ${({ theme }) => theme.spacing(-2 * CURL_SIZE)};
    left: 0;
    border-color: #777 #777 transparent transparent;
  }

  &:before {
    top: ${({ theme }) => theme.spacing(-2 * CURL_SIZE)};
    right: 0;
    border-color: transparent transparent #888 #888;
  }
`;
//
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   padding: theme.spacing(2.5),
//   color: theme.palette.text.secondary,
// }));

const AuctionCard: React.FC<{
  auction: AuctionType;
  onBid: () => void;
}> = ({ auction, onBid }) => {
  const { t } = useTranslation('auction');
  const isActive = auction.status === 'Active'; // need to do it this way, otherwise SB loader problems
  const isWinning = false;
  const isLosing = true;
  return (
    <Item isActive={isActive} isWinning={isWinning} isLosing={isLosing}>
      <Typography gutterBottom variant='h6' component='div'>
        {auction.title}
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography color='text.secondary'>{auction.description}</Typography>
      </Box>

      <GiftBox
        isWinning={isWinning}
        isLosing={isLosing}
        padding={2}
        marginBottom={3}
      >
        <Typography variant='body2' marginTop={0} marginBottom={1}>
          {t('what-is-inside')}
        </Typography>

        <Box sx={{ marginBottom: 1 }}>
          {auction.basket.map((item: BasketItem) => (
            <AuctionBasketItem key={item.ticker} item={item} />
          ))}
        </Box>
        <Typography variant='body2'>
          {t('for-a-total-value-of')}{' '}
          <Typography
            color='primary'
            component='span'
            fontWeight={600}
            variant='body2'
          >
            {auction.monetaryValue}
          </Typography>
        </Typography>
      </GiftBox>

      <Box display={'flex'} textAlign={'center'} flexDirection={'column'}>
        <FinalCountdown date={auction.expiresAt} />
        <Typography fontSize={18} marginBottom={3}>
          <Trans
            i18nKey={`auction:${isActive ? 'last' : 'winning'}-bid`}
            count={auction.lastBid.value}
          >
            <Typography
              fontSize={20}
              variant='body2'
              color='secondary.light'
              component='span'
              fontWeight={600}
            />
            <Chip avatar={<Avatar>M</Avatar>} label='Avatar' />
          </Trans>
        </Typography>

        {isActive && (
          <Button variant={'contained'} size='large' onClick={onBid}>
            {t('bid')}
          </Button>
        )}
      </Box>
    </Item>
  );
};

export default AuctionCard;
