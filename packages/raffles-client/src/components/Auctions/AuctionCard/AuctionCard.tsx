import { Box } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import FinalCountdown from './FinalCountdown';
import BidButton from './BidButton';
import { getWinningLosingStatus } from './util';
import { ReactComponent as ZigCoinIcon } from 'assets/icons/zig-coin.svg';
import AuctionRanking from '../AuctionRanking/AuctionRanking';
import { useModal } from 'mui-modal-provider';
import ProjectDetailsModal from 'components/Modals/ProjectDetails';
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
  ContainerChainIcon,
  StyledTextButton,
} from './styles';
import ClaimButton from './ClaimButton';
import useUpdatedAt from 'hooks/useUpdatedAt';
import { ChainIcon } from 'components/common/ChainIcon';
import { GET_AUCTIONS } from 'queries/auctions';
import { useLazyQuery } from '@apollo/client';
import useCurrentUser from 'hooks/useCurrentUser';
import Loader from 'components/common/Loader';

const AuctionCard: React.FC<{
  auction: AuctionType;
}> = ({ auction }) => {
  const { t } = useTranslation('auction');
  useLazyQuery(GET_AUCTIONS, {
    variables: {
      id: auction.id,
    },
  });
  const { user } = useCurrentUser();
  const { isActive, hasWon, isStarted } = getWinningLosingStatus(
    auction,
    user?.id,
  );
  const { showModal } = useModal();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isColumn, setIsColumn] = useState(false);

  // Update ui when expiration date is reached
  // Add delay in case of last ms bid event
  const updatedAt = useUpdatedAt(
    isActive || !auction.startDate ? auction.expiresAt : auction.startDate,
    1500,
  );

  const showClaim = useMemo(
    () => (!updatedAt || +new Date() >= updatedAt) && hasWon,
    [hasWon, updatedAt, auction.isFinalized],
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
          <ContainerChainIcon>
            <ChainIcon chain={auction.chain} />
          </ContainerChainIcon>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='flex-start'
          >
            <Box display='flex' gap={1} whiteSpace='nowrap'>
              <Typography variant='h2' color='neutral100'>
                {auction.title}
              </Typography>
            </Box>
            <StyledTextButton
              color='links'
              caption={t('project-desc')}
              onClick={() => showModal(ProjectDetailsModal, { auction })}
            />
          </Box>
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
            <FinalCountdown
              date={
                isActive || !auction.startDate
                  ? auction.expiresAt
                  : auction.startDate
              }
              started={true}
            />
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
            {isActive || !isStarted ? t('ranking') : t('winners')}
          </Typography>
        </CardHeader>
        <CardBody>
          <AuctionRanking
            auction={auction}
            isActive={isActive}
            isStarted={isStarted}
          />
          <CardActions isColumn={isColumn}>
            {showClaim ? (
              auction.isFinalized ? (
                <ClaimButton auction={auction} />
              ) : (
                <Loader />
              )
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
