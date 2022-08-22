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
import { Ellipsis, Rank, RankingHead, RankingRowContainer } from './styles';

const RankingRow = ({ bid }: { bid: AuctionBidType }) => {
  const { user, value, position } = bid;
  const { user: currentUser } = useCurrentUser();
  return (
    <RankingRowContainer isMe={user.id === +currentUser?.id}>
      <Rank>
        <Typography>{position}.</Typography>
      </Rank>
      <Box display='flex' justifyContent='space-between' flex={1}>
        <Typography>{user.username || user.id}</Typography>
        <Typography>{value} ZIG</Typography>
      </Box>
    </RankingRowContainer>
  );
};

const AuctionRanking = ({ auction }: { auction: AuctionType }) => {
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const MAX_WINNERS_DISPLAYED = isMobile ? 3 : 7;
  const { t } = useTranslation('auction');

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
    auction.userBid?.position <= auction.numberOfWinners &&
    // outside of visible list
    auction.userBid?.position > MAX_WINNERS_DISPLAYED - (isTruncated ? 1 : 0);
  const userBid = bids.find((b) => b.id === auction.userBid?.id);

  // If we truncate the list to show the last winner or current user, that's 2 added lines. (counting the elipsis)
  // If we need to show both of them, that's 3 lines.
  const linesAdded = isTruncated
    ? isUserTruncated && userBid?.position !== bids.length
      ? 3
      : 2
    : 0;

  console.log(MAX_WINNERS_DISPLAYED, bids.length, linesAdded);

  return (
    <Box width='100%'>
      <RankingHead>
        <Typography color='neutral200'>{t('user')}</Typography>
        <Typography color='neutral200'>{t('bid')}</Typography>
      </RankingHead>
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
          <Ellipsis />
          {/* Current user */}
          {isUserTruncated && userBid?.position !== auction.bids.length && (
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
