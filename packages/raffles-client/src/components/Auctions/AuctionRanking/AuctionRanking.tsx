/* eslint-disable i18next/no-literal-string */
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@zignaly-open/ui';
import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import { useTranslation } from 'react-i18next';
import useCurrentUser from 'hooks/useCurrentUser';
import { useMediaQuery } from '@mui/material';
import muiTheme from 'theme';
import { Ellipsis, Rank, RankingRowContainer } from './styles';

const RankingRow = ({ bid }: { bid: AuctionBidType }) => {
  const { user, position } = bid;
  const { user: currentUser } = useCurrentUser();
  const { t } = useTranslation('auction');

  return (
    <RankingRowContainer isMe={user.id === +currentUser?.id}>
      <Rank>
        <Typography>{position}.</Typography>
      </Rank>
      <Box display='flex' justifyContent='space-between' flex={1}>
        <Typography>{user.username || `${t('user')} ${user.id}`}</Typography>
      </Box>
    </RankingRowContainer>
  );
};

const AuctionRanking = ({ auction }: { auction: AuctionType }) => {
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const MAX_WINNERS_DISPLAYED = isMobile ? 3 : 7;

  // Number of winners we can display
  const winnersDisplayed = Math.min(
    auction.numberOfWinners,
    MAX_WINNERS_DISPLAYED,
  );

  // Bids cleared from the user bid
  const bids = auction.bids
    .filter((b) => b.position <= auction.numberOfWinners)
    .sort((a, b) => a.position - b.position);

  const isTruncated =
    // Too many bids
    bids.length > MAX_WINNERS_DISPLAYED ||
    // Too many winning spots
    auction.numberOfWinners > MAX_WINNERS_DISPLAYED;

  // Current user is winning but is too far in the list to be showed.
  // We'll hide enough winners above him to show him.
  // If we also already need to truncate the list to show the last winners,
  // then we need to substract an additional line.
  const isUserTruncated =
    // user winning
    auction.userBid?.position < auction.numberOfWinners &&
    // outside of visible list
    auction.userBid?.position >
      MAX_WINNERS_DISPLAYED -
        // Minus 1 line if ellipsis is shown
        (isTruncated ? 1 : 0);

  const userBid = bids.find((b) => b.id === auction.userBid?.id);

  // On mobile we need to replace the ellipsis by the user if it's in the 2nd position
  const mobileForceUser = isMobile && userBid?.position === 2;

  // If we truncate the list to show the last winner or current user, that's 2 added lines. (counting the elipsis)
  // If we need to show both of them, that's 3 lines.
  const linesAdded = isTruncated
    ? isUserTruncated && userBid?.position !== bids.length && !isMobile
      ? 3
      : 2
    : 0;

  return (
    <Box width='100%'>
      {bids
        .filter(
          (b) =>
            b.position <=
            (isTruncated
              ? MAX_WINNERS_DISPLAYED - linesAdded
              : winnersDisplayed),
        )
        .map((bid: AuctionBidType) => (
          <RankingRow bid={bid} key={bid.id} />
        ))}
      {Array.from(
        // Placeholder rows
        { length: MAX_WINNERS_DISPLAYED - bids.length - linesAdded },
        (_, i) => (
          <PlaceHolderRow
            hide={i >= auction.numberOfWinners - bids.length}
            key={i}
            index={i + bids.length}
          />
        ),
      )}
      {isTruncated && (
        <>
          {(!isMobile || (!isUserTruncated && !mobileForceUser)) && (
            <Ellipsis />
          )}
          {/* Current user */}
          {(isUserTruncated || mobileForceUser) &&
            userBid?.position !== auction.numberOfWinners && (
              <RankingRow bid={userBid} key={userBid.id} />
            )}
          {bids[auction.numberOfWinners - 1] ? (
            // Last winner
            <RankingRow
              bid={bids[auction.numberOfWinners - 1]}
              key={bids[auction.numberOfWinners - 1].id}
            />
          ) : (
            // Last placeholder rank
            <PlaceHolderRow index={auction.numberOfWinners - 1} />
          )}
        </>
      )}
    </Box>
  );
};

const PlaceHolderRow = ({ index, hide }: { index: number; hide?: boolean }) => {
  return (
    <RankingRowContainer hide={hide}>
      <Rank>
        <Typography>{index + 1}.</Typography>
      </Rank>
    </RankingRowContainer>
  );
};

export default AuctionRanking;
