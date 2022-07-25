import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography, PriceLabel, TextButton, Button } from 'zignaly-ui';
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
import ClaimModal from 'components/Modals/Claim';

const Item = styled('div')(({ theme }) => ({
  background: 'rgba(37, 35, 57, 0.4)',
  border: '1px solid rgba(193, 193, 200, 0.4)',
  borderRadius: '16px',
  [theme.breakpoints.up('lg')]: {
    width: '640px',
  },
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}));

const CardHeader = styled('div')`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 64px;
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    border-bottom: 1px solid rgba(193, 193, 200, 0.4);
    margin-bottom: 20px;
  }
`;

const CardHeaderLeft = styled(CardHeader)`
  border-bottom: 1px solid rgba(193, 193, 200, 0.4);
`;

const AuctionImage = styled('img')`
  width: 100%;
  height: 209px;
  object-fit: cover;
`;

const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin: 20px 0 16px;
`;

const CardColumn = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  min-width: 275px;
`;

const CardBody = styled('div')`
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
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
      width: auto !important;
    }
  }
`;

const CardActions = styled('div')`
  display: flex;
  align-items: flex-end;
  flex: 1;
  padding: 8px 0 30px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
  }
`;

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { t } = useTranslation('auction');
  const { isActive, hasWon } = getWinningLosingStatus(auction);
  const { showModal } = useModal();

  return (
    <Item>
      <CardColumn>
        <CardHeaderLeft>
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
        </CardHeaderLeft>
        {auction.imageUrl && (
          <Box px='30px'>
            <AuctionImage src={auction.imageUrl} alt={auction.title} />
          </Box>
        )}
        <CardBody>
          <StyledAmountContainer>
            <Box display='flex'>
              <ZigCoinIcon width={24} height={24} />
              <StyledPriceLabel value={auction.minimalBid} coin='ZIG' />
            </Box>
            <FinalCountdown date={auction.expiresAt} started={true} />
          </StyledAmountContainer>
          <Box sx={{ display: { xs: 'none' } }}>
            <CardActions>
              <BidButton auction={auction} isActive={isActive} />
            </CardActions>
          </Box>
        </CardBody>
      </CardColumn>
      <CardColumn>
        <CardHeader>
          <Typography variant='h2' color='neutral100'>
            {t('ranking')}
          </Typography>
        </CardHeader>
        <CardBody>
          <AuctionRanking auction={auction} />
          <CardActions>
            {hasWon ? (
              <Button
                size='large'
                onClick={() =>
                  showModal(ClaimModal, {
                    auction,
                  })
                }
                caption={t('claim-now')}
              />
            ) : (
              <Box sx={{ display: { xs: 'auto', sm: 'none' } }}>
                <BidButton auction={auction} isActive={isActive} />
              </Box>
            )}
          </CardActions>
        </CardBody>
      </CardColumn>
    </Item>
  );
};

export default AuctionCard;
