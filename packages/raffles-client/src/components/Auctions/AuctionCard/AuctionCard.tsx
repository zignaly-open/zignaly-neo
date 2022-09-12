import { Box } from '@mui/material';
import { Typography, TextButton, Button, TimeIcon } from '@zignaly-open/ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import ClaimCountdown from './ClaimCountdown';

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { t } = useTranslation('auction');
  const { isActive, hasWon } = getWinningLosingStatus(auction);
  const { showModal } = useModal();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isColumn, setIsColumn] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  const maxClaimDateExpired =
    auction.maxClaimDate && new Date(auction.maxClaimDate) < new Date();
  const canClaim = !auction.userBid?.isClaimed && !maxClaimDateExpired;
  const missClaim = !auction.userBid?.isClaimed && maxClaimDateExpired;

  const showClaim = useMemo(
    () => (!updatedAt || +new Date() - updatedAt > 0) && hasWon,
    [updatedAt],
  );

  useEffect(() => {
    // Update ui when expiration date is reached
    const timeout = +new Date(auction.expiresAt) - +new Date();
    const timeoutId = setTimeout(() => {
      if (timeout > 0) {
        setUpdatedAt(+new Date());
      }
      // Delay in case of last ms bid event
    }, timeout + 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [auction.expiresAt]);

  useEffect(() => {
    // Update ui when max claim date is reached
    const timeout = +new Date(auction.maxClaimDate) - +new Date();
    const timeoutId = setTimeout(() => {
      if (timeout > 0) {
        setUpdatedAt(+new Date());
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [auction.maxClaimDate]);

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
              <PriceLabel value={auction.currentBid} coin='ZIG' />
            </Box>
            <FinalCountdown date={auction.expiresAt} started={true} />
          </StyledAmountContainer>
          <CardActions isColumn={isColumn} hide={isColumn}>
            <BidButton
              auction={auction}
              isActive={isActive}
              updatedAt={updatedAt}
            />
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
          <AuctionRanking auction={auction} isActive={isActive} />
          <CardActions isColumn={isColumn}>
            {showClaim ? (
              <Button
                variant={missClaim ? 'secondary' : 'primary'}
                size='large'
                onClick={() =>
                  showModal(ClaimModal, {
                    auction,
                  })
                }
                disabled={missClaim}
                caption={t(
                  missClaim
                    ? 'ended'
                    : auction.userBid?.isClaimed
                    ? 'instructions'
                    : 'claim-now',
                )}
                bottomElement={
                  canClaim && auction.maxClaimDate ? (
                    <ClaimCountdown
                      date={auction.maxClaimDate}
                      started={true}
                    />
                  ) : null
                }
                leftElement={
                  canClaim && auction.maxClaimDate ? (
                    <TimeIcon height={21} width={21} />
                  ) : null
                }
              />
            ) : (
              isColumn && (
                <BidButton
                  auction={auction}
                  isActive={isActive}
                  updatedAt={updatedAt}
                />
              )
            )}
          </CardActions>
        </CardBody>
      </CardColumn>
    </Item>
  );
};

export default AuctionCard;
