/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { styled } from '@mui/material/styles';
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

const RankingHead = styled('div')`
  background: #222249;
  box-shadow: 0 0 10px #16192b;
  border-radius: 5px;
  height: 38px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 12px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;

const RankingRowContainer = styled(Box)<{ isMe?: boolean }>(
  ({ isMe, theme }) => ({
    display: 'flex',
    color: isMe ? theme.highlighted : theme.neutral100,
    padding: '6px 0',
    borderBottom: '1px solid #222249',
  }),
);

const Rank = styled('div')`
  margin: 0 14px 0 10px;
`;

const Ellipsis = styled(RankingRowContainer)`
  align-items: center;
  height: 24px;
  padding-left: 10px;

  &:before {
    content: '...';
  }
`;

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
  const winnersDisplayed = Math.min(
    auction.numberOfWinners,
    MAX_WINNERS_DISPLAYED,
  );

  // Current user is winning but is too far in the list to be showed.
  // We'll hide enough winners above him to show him.
  const isTruncated =
    // user winning
    auction.userBid?.position <= auction.numberOfWinners &&
    // outside of visible list
    auction.userBid?.position > MAX_WINNERS_DISPLAYED;

  return (
    <Box width='100%'>
      <RankingHead>
        <Typography color='neutral200'>{t('user')}</Typography>
        <Typography color='neutral200'>{t('bid')}</Typography>
      </RankingHead>
      {auction.bids
        .filter(
          (b) =>
            b.position <=
            (isTruncated ? MAX_WINNERS_DISPLAYED - 2 : winnersDisplayed),
        )
        .sort((a, b) => a.position - b.position)
        .map((bid: AuctionBidType) => (
          <RankingRow bid={bid} key={bid.id} />
        ))}
      {isTruncated ? (
        <>
          <Ellipsis />
          <RankingRow
            bid={auction.bids[auction.bids.length - 1]}
            key={auction.bids[auction.bids.length - 1].id}
          />
        </>
      ) : (
        Array.from(
          { length: winnersDisplayed - auction.bids.length },
          (_, i) => (
            <RankingRowContainer>
              <Rank>
                <Typography>{auction.bids.length + i + 1}.</Typography>
              </Rank>
            </RankingRowContainer>
          ),
        )
      )}
    </Box>
  );
};

export default AuctionRanking;
