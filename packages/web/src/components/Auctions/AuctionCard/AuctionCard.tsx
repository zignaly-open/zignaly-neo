import { Box } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import { Typography, PriceLabel, TextButton, Button } from 'zignaly-ui';
import React, { useEffect, useRef, useState } from 'react';
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
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [theme.breakpoints.up('lg')]: {
    width: '640px',
  },
}));

const CardHeader = styled('div')<{ isColumn: boolean }>`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  ${({ isColumn }) =>
    isColumn
      ? css`
          height: 64px;
        `
      : css`
          border-bottom: 1px solid rgba(193, 193, 200, 0.4);
          margin-bottom: 20px;
        `}
`;

const CardHeaderLeft = styled(CardHeader)`
  border-bottom: 1px solid rgba(193, 193, 200, 0.4);
`;

const AuctionImage = styled('img')<{ isColumn: boolean }>`
  width: 100%;
  height: 209px;
  object-fit: cover;
  box-sizing: border-box;
  ${({ isColumn }) =>
    !isColumn &&
    css`
      padding: 0 30px;
    `}
`;

const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin: 20px 0 16px;
  max-width: 300px;
`;

const CardColumn = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  min-width: 265px;
`;

const CardBody = styled('div')`
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
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

const CardActions = styled('div')<{ isColumn: boolean; hide?: boolean }>`
  display: flex;
  align-items: flex-end;
  flex: 1;
  padding: 8px 0 30px;
  justify-content: center;

  ${({ isColumn }) =>
    isColumn &&
    css`
      flex-direction: column;
      align-items: center;
      padding-top: 25px;
    `}

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`;

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { t } = useTranslation('auction');
  const { isActive, hasWon } = getWinningLosingStatus(auction);
  const { showModal } = useModal();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isColumn, setIsColumn] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      // Detect when the right column is wrapped.
      // (due to the card width being too small for the column min-width)
      setIsColumn(leftRef.current.offsetTop !== rightRef.current.offsetTop);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Item>
      <CardColumn ref={leftRef}>
        <CardHeaderLeft isColumn={isColumn}>
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
          <AuctionImage
            isColumn={isColumn}
            src={auction.imageUrl}
            alt={auction.title}
          />
        )}
        <CardBody>
          <StyledAmountContainer>
            <Box display='flex'>
              <ZigCoinIcon width={24} height={24} />
              <StyledPriceLabel value={auction.minimalBid} coin='ZIG' />
            </Box>
            <FinalCountdown date={auction.expiresAt} started={true} />
          </StyledAmountContainer>
          <CardActions isColumn={isColumn} hide={isColumn}>
            <BidButton auction={auction} isActive={isActive} />
          </CardActions>
        </CardBody>
      </CardColumn>
      <CardColumn ref={rightRef}>
        <CardHeader isColumn={isColumn}>
          <Typography variant='h2' color='neutral100'>
            {t('ranking')}
          </Typography>
        </CardHeader>
        <CardBody>
          <AuctionRanking auction={auction} />
          <CardActions isColumn={isColumn} hide={!hasWon && !isColumn}>
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
              <BidButton auction={auction} isActive={isActive} />
            )}
          </CardActions>
        </CardBody>
      </CardColumn>
    </Item>
  );
};

export default AuctionCard;
