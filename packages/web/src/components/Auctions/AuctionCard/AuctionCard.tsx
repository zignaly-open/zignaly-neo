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
  width: 100%;
  height: 209px;
`;

const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin: 20px 0 16px;
`;

const CardColumn = styled('div')`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 30px;
`;

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

const AuctionCard: React.FC<{
  auction: AuctionType;
  currentUserId?: number;
}> = ({ auction, currentUserId }) => {
  const { t } = useTranslation('auction');
  const { isActive, isWinning, isLosing } = getWinningLosingStatus(auction);
  return (
    <Item isActive={isActive} isWinning={isWinning} isLosing={isLosing}>
      <AuctionHeader>
        <CardColumn>
          <Typography variant='h2' color='neutral100'>
            {auction.title}
          </Typography>
          <Typography color='links' component='div'>
            {t('project-desc')}
          </Typography>
        </CardColumn>
        <CardColumn>
          <Typography variant='h2' color='neutral100'>
            {t('ranking')}
          </Typography>
        </CardColumn>
      </AuctionHeader>
      <Box display='flex'>
        <CardColumn>
          {auction.imageUrl && (
            <AuctionImage src={auction.imageUrl} alt={auction.title} />
          )}
          <StyledAmountContainer>
            <Box display='flex'>
              <ZigCoinIcon width={24} height={24} />
              <StyledPriceLabel
                value={
                  auction.bids.length
                    ? auction.bids[0].value
                    : auction.minimalBid
                }
                coin='ZIG'
              />
            </Box>
            <FinalCountdown date={auction.expiresAt} />
          </StyledAmountContainer>
          <CardActions style={{ marginBottom: '30px' }}>
            <BidButton auction={auction} />
          </CardActions>
        </CardColumn>
        <CardColumn></CardColumn>
      </Box>
    </Item>
  );
};

export default AuctionCard;
