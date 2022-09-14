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

import {
  Rank,
  RankingContainer,
  RankingList,
  RankingRowContainer,
} from './styles';

const RankingRow = ({
  bid,
  isWinning,
}: {
  bid: AuctionBidType;
  isWinning: boolean;
}) => {
  const { user, position } = bid;
  const { user: currentUser } = useCurrentUser();

  return (
    <RankingRowContainer
      isMe={user.id === +currentUser?.id}
      isWinning={isWinning}
    >
      <Rank position={position}>{position}.</Rank>
      <UserRank bid={bid} isWinning={isWinning} />
    </RankingRowContainer>
  );
};

const UserRank = ({
  bid,
  isWinning,
}: {
  bid: AuctionBidType;
  isWinning: boolean;
}) => {
  const { user } = bid;
  const { t } = useTranslation('auction');

  return (
    <>
      {user.username || `${t('user')}#${user.id}`} {isWinning && '🏆'}
    </>
  );
};

const AuctionRanking = ({
  auction,
  isActive,
}: {
  auction: AuctionType;
  isActive: boolean;
}) => {
  const { t } = useTranslation('auction');
  const bids = auction.bids.slice().sort((a, b) => a.position - b.position);
  const userBid = bids.find((b) => b.id === auction.userBid?.id);

  return (
    <RankingContainer>
      <Box textAlign='center' mb={2}>
        <Typography color='neutral200'>
          {t(userBid ? 'your-position' : 'bid-participate')}&nbsp;
        </Typography>
        <Typography color='neutral100'>
          {userBid && (
            <span style={{ fontWeight: 600 }}>
              {userBid.position}.&nbsp;
              <UserRank
                bid={userBid}
                isWinning={userBid.position <= auction.numberOfWinners}
              />
            </span>
          )}
        </Typography>
      </Box>
      <RankingList>
        {bids.map((bid) => (
          <RankingRow
            bid={bid}
            key={bid.id}
            isWinning={bid.position <= auction.numberOfWinners}
          />
        ))}
        {Array.from(
          // Placeholder rows
          {
            length: isActive ? auction.numberOfWinners - bids.length : 0,
          },
          (_, i) => (
            <PlaceHolderRow key={i} index={i + bids.length} />
          ),
        )}
      </RankingList>
    </RankingContainer>
  );
};

const PlaceHolderRow = ({ index, hide }: { index: number; hide?: boolean }) => {
  return (
    <RankingRowContainer hide={hide} isWinning={true}>
      <Rank>
        <Typography>{index + 1}.</Typography>
      </Rank>
    </RankingRowContainer>
  );
};

export default AuctionRanking;
