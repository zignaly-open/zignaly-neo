import { Box, Card, CardActions, CardHeader, CardMedia } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { Typography, PriceLabel } from 'zignaly-ui';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { AuctionType, BasketItem } from '@zigraffle/shared/types';
import AuctionBasketItem from './AuctionBasketItem';
import FinalCountdown from './FinalCountdown';
import BidButton from './BidButton';
import { getWinningLosingStatus } from './util';
import { AmountContainer } from '../../common/AmountContainer';
import { ReactComponent as ZigCoinIcon } from 'images/zig-coin.svg';

const Item = styled('div', {
  shouldForwardProp: (prop: string) =>
    !['isActive', 'isWinning', 'isLosing'].includes(prop),
})<{
  isActive: boolean;
  isWinning: boolean;
  isLosing: boolean;
}>(({ theme, isActive, isWinning, isLosing }) => ({
  // background: theme.neutral700,
  background: '#13132b',
  border: '1px solid #35334A',
  borderRadius: '16px',
  minWidth: '640px',

  //   overflow: 'visible',
  //   backgroundColor: isWinning
  //     ? '#ebffea'
  //     : isLosing
  //     ? '#ffeaea'
  //     : isActive
  //     ? '#fff'
  //     : '#e5e5e5',
  //   filter: isActive ? 'unset' : 'grayscale(50%)',
  //   boxShadow: isWinning ? `0 0 0 3px #aaff99 inset` : 'unset',
  //   color: theme.palette.text.secondary,
}));

const AuctionHeader = styled('div')(({ theme }) => ({
  background: theme.neutral750,
  display: 'flex',
  height: '80px',
  marginBottom: '20px',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
}));

const AuctionImage = styled('img')`
  /* width: 268px; */
  width: 100%;
  height: 209px;
`;

const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin-top: 20px;
`;

const CardCol = styled('div')`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 30px;
`;

const CURL_SIZE = 0.5;

const StyledPriceLabel = styled(PriceLabel)`
  span > span {
    &:first-child {
      font-size: 22px !important;
      margin-left: 10px;
      color: ${({ theme }) => theme.neutral100};
    }

    &:nth-child(2) {
      font-size: 15px !important;
    }
  }
`;

const GiftBox = styled(Box)<{ isWinning: boolean; isLosing: boolean }>`
  background: ${(props) =>
    props.isWinning ? '#0f950f' : props.isLosing ? '#950f0f' : '#eee'};
  margin-left: ${({ theme }) => theme.spacing(-2 * CURL_SIZE)};
  margin-right: ${({ theme }) => theme.spacing(-2 * CURL_SIZE)};
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

const AuctionCard: React.FC<{
  auction: AuctionType;
  currentUserId?: number;
}> = ({ auction, currentUserId }) => {
  const { t } = useTranslation('auction');
  const { isActive, isWinning, isLosing } = getWinningLosingStatus(auction);
  return (
    <Item isActive={isActive} isWinning={isWinning} isLosing={isLosing}>
      <AuctionHeader>
        <CardCol>
          <Typography variant='h2' color='neutral100'>
            {auction.title}
          </Typography>
          <Typography color='links' component='div'>
            Project Description
          </Typography>
        </CardCol>
        <CardCol>
          <Typography variant='h2' color='neutral100'>
            {t('ranking')}
          </Typography>
        </CardCol>
      </AuctionHeader>
      <Box display='flex'>
        <CardCol>
          {auction.imageUrl && (
            <AuctionImage src={auction.imageUrl} alt={auction.title} />
          )}
          <StyledAmountContainer>
            {/* <img src={ZigCoinIcon} width={24} height={24} /> */}
            <Box display='flex'>
              <ZigCoinIcon width={24} height={24} />
              <StyledPriceLabel value={0} coin='ZIG' />
            </Box>
            <FinalCountdown date={auction.expiresAt} />
          </StyledAmountContainer>
          {/* <AmountContainer
            isWinning={isWinning}
            isLosing={isLosing}
            padding={2}
            marginBottom={3}
          >
            <Typography variant='body2' marginTop={0} marginBottom={0.5}>
              {t('what-is-inside')}
            </Typography>
            <Box sx={{ marginBottom: 1 }}>
              {auction.basketItems.map((item: BasketItem) => (
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
          </AmountContainer> */}
          <Box display={'flex'} textAlign={'center'} flexDirection={'column'}>
            {/* <FinalCountdown date={auction.expiresAt} /> */}
            <Typography fontSize={18} marginBottom={3}>
              {auction.bids?.length ? (
                <Trans
                  i18nKey={`auction:${
                    isActive
                      ? auction.bids?.length
                        ? 'last'
                        : 'starting'
                      : 'winning'
                  }-bid`}
                  values={{
                    bid: auction.bids[0].value,
                    name:
                      (auction.bids?.[0]?.user.username ??
                        `#${auction.bids?.[0]?.user.id}`) +
                      (currentUserId &&
                      +currentUserId === +auction.bids?.[0]?.user.id
                        ? `${t('it-is-you')}`
                        : ''),
                  }}
                >
                  <Typography
                    fontSize={20}
                    variant='body2'
                    color='prettyPink.main'
                    component='span'
                    fontWeight={600}
                  />
                  <Typography
                    fontSize={20}
                    variant='body2'
                    color='prettyPink.main'
                    component='span'
                    fontWeight={600}
                  />
                </Trans>
              ) : (
                <Typography
                  fontSize={20}
                  variant='body2'
                  color='prettyPink.main'
                  component='span'
                  fontWeight={600}
                >
                  {t('no-bids' + (isActive ? '-yet' : ''))}
                </Typography>
              )}
            </Typography>
            {isActive && (
              <CardActions>
                <BidButton auction={auction} />
              </CardActions>
            )}
          </Box>
        </CardCol>
        <CardCol></CardCol>
      </Box>
    </Item>
  );
};

export default AuctionCard;
