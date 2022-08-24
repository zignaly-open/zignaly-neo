import { Box } from '@mui/material';
import { Typography, TextButton, Button, TimeIcon } from '@zignaly-open/ui';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
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
import { useTimeout } from 'react-use';
import ClaimCountdown from './ClaimCountdown';

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { t } = useTranslation('auction');
  const { isActive, hasWon } = getWinningLosingStatus(auction);
  const { showModal } = useModal();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const renderDate = useRef(+new Date());
  const [isColumn, setIsColumn] = useState(false);

  const claimButtonInactive =
    auction.userBid?.isClaimed || auction.maxClaimDate > new Date();

  const [hasJustExpired] = useTimeout(
    +new Date(auction.expiresAt) - renderDate.current,
  );

  useEffect(() => {
    const handleWindowResize = () => {
      // Detect when the right column is wrapped.
      // (due to the card width being too small for the column min-width)
      setIsColumn(leftRef.current.offsetTop !== rightRef.current.offsetTop);
    };
    handleWindowResize();

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
            {isActive ? t('ranking') : t('winners')}
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
                disabled={claimButtonInactive}
                caption={t(claimButtonInactive ? 'claimed' : 'claim-now')}
                bottomElement={
                  <ClaimCountdown date={auction.maxClaimDate} started={true} />
                }
                leftElement={<TimeIcon height={21} width={21} />}
              />
            ) : (
              <BidButton
                auction={auction}
                isActive={isActive && !hasJustExpired()}
              />
            )}
          </CardActions>
        </CardBody>
      </CardColumn>
    </Item>
  );
};

export default AuctionCard;
