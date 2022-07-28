import { Box } from '@mui/material';
import { Typography, TextButton, Button } from 'zignaly-ui';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zigraffle/shared/types';
import FinalCountdown from './FinalCountdown';
import BidButton from './BidButton';
import { getWinningLosingStatus } from './util';
import { ReactComponent as ZigCoinIcon } from 'images/zig-coin.svg';
import AuctionRanking from '../AuctionRanking/AuctionRanking';
import { useModal } from 'mui-modal-provider';
import ProjectDetailsModal from 'components/Modals/ProjectDetails';
import ClaimModal from 'components/Modals/Claim';
import {
  AuctionImage,
  CardBody,
  CardColumn,
  CardHeaderLeft,
  Item,
  StyledAmountContainer,
  PriceLabel,
  CardActions,
  CardHeader,
} from './styles';

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
            onClick={() => showModal(ProjectDetailsModal, { auction })}
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
              <PriceLabel value={auction.minimalBid} coin='ZIG' />
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
            {hasWon && !auction.userBid.isClaimed ? (
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
