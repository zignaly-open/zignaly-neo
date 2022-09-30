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
  isStarted,
}: {
  auction: AuctionType;
  isActive: boolean;
  isStarted: boolean;
}) => {
  const { t } = useTranslation('auction');
  const { user } = useCurrentUser();
  const userBid = auction.bids.find((b) => b.user.id === user?.id);

  return (
    <RankingContainer>
      <Box textAlign='center' mb={2}>
        <Typography color='neutral200'>
          {t(
            userBid
              ? 'your-position'
              : isStarted
              ? isActive
                ? 'bid-participate'
                : 'over'
              : 'get-ready',
          )}
          &nbsp;
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
        {auction.bids.map((bid) => (
          <RankingRow
            bid={bid}
            key={bid.user.id}
            isWinning={bid.position <= auction.numberOfWinners}
          />
        ))}
        {Array.from(
          // Placeholder rows
          {
            length:
              isActive || !isStarted
                ? auction.numberOfWinners - auction.bids.length
                : 0,
          },
          (_, i) => (
            <PlaceHolderRow key={i} index={i + auction.bids.length} />
          ),
        )}
      </RankingList>
    </RankingContainer>
  );
};

const PlaceHolderRow = ({ index, hide }: { index: number; hide?: boolean }) => {
  const { t } = useTranslation('auction');

  return (
    <RankingRowContainer hide={hide} isWinning={true}>
      <Rank position={index + 1}>
        <Typography>{index + 1}.</Typography>
      </Rank>
      <i>{t('empty')}</i>
    </RankingRowContainer>
  );
};

export default AuctionRanking;
