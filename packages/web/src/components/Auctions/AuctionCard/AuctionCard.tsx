import { Box, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography, PriceLabel, TextButton } from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zigraffle/shared/types';
import FinalCountdown from './FinalCountdown';
import BidButton from './BidButton';
import { getWinningLosingStatus } from './util';
import { AmountContainer } from '../../common/AmountContainer';
import { ReactComponent as ZigCoinIcon } from 'images/zig-coin.svg';
import AuctionRanking from '../AuctionRanking/AuctionRanking';
import { useModal } from 'mui-modal-provider';
import ProjectDetailsModal from 'components/Modals/ProjectDetails';

const Item = styled('div')(({ theme }) => ({
  background: 'rgba(37, 35, 57, 0.4)',
  border: '1px solid rgba(53, 51, 74, 0.4)',
  borderRadius: '16px',
  [theme.breakpoints.up('lg')]: {
    width: '640px',
  },
}));

const AuctionHeader = styled('div')`
  display: flex;
  height: 80px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.neutral750};
  border-radius: 16px;
`;

const AuctionImage = styled('img')`
  width: 100%;
  height: 209px;
`;

const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin: 20px 0 16px;
`;

const HeaderColumn = styled('div')`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CardColumn = styled('div')`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 30px;
`;

const StyledPriceLabel = styled(PriceLabel)`
  span > span {
    &:nth-of-type(1) {
      font-size: 22px !important;
      margin-left: 10px;
      color: ${({ theme }) => theme.neutral100};
    }

    &:nth-of-type(2) {
      font-size: 15px !important;
    }
  }
`;

const AuctionCard: React.FC<{
  auction: AuctionType;
  currentUserId?: number;
}> = ({ auction, currentUserId }) => {
  const { t } = useTranslation('auction');
  const { isActive /* isWinning, isLosing */ } =
    getWinningLosingStatus(auction);
  const { showModal } = useModal();
  return (
    <Item>
      <AuctionHeader>
        <HeaderColumn>
          <Typography variant='h2' color='neutral100'>
            {auction.title}
          </Typography>
          <TextButton
            color='links'
            caption={t('project-desc')}
            onClick={() =>
              showModal(ProjectDetailsModal, {
                title: auction.title,
                website: auction?.website ?? '',
                discord: auction?.discord ?? '',
                twitter: auction?.twitter ?? '',
                telegram: auction?.telegram ?? '',
              })
            }
          />
        </HeaderColumn>
        <HeaderColumn>
          <Typography variant='h2' color='neutral100'>
            {t('ranking')}
          </Typography>
        </HeaderColumn>
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
            <FinalCountdown date={auction.expiresAt} started={true} />
          </StyledAmountContainer>
          <CardActions style={{ marginBottom: '30px' }}>
            <BidButton auction={auction} isActive={isActive} />
          </CardActions>
        </CardColumn>
        <CardColumn>
          <AuctionRanking auction={auction} currentUserId={currentUserId} />
        </CardColumn>
      </Box>
    </Item>
  );
};

export default AuctionCard;
