import React from 'react';
import { styled } from '@mui/material/styles';
// import { useQuery } from '@apollo/client';
// import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Typography } from 'zignaly-ui';
import { AuctionBidType, AuctionType } from '@zigraffle/shared/types';

const RankingRowContainer = styled(Box)<{ isMe: boolean }>(
  ({ isMe, theme }) => ({
    display: 'flex',
    color: isMe ? theme.highlighted : theme.neutral100,
    padding: '10px 0',
    borderBottom: '1px solid #222249',
  }),
);

const Name = styled(Typography)<{ isPlaceholder: boolean }>`
  ${({ isPlaceholder }) => isPlaceholder && `margin-left: 25px`}
`;

const Amount = styled(Typography)<{ isPlaceholder: boolean }>`
  ${({ isPlaceholder }) => isPlaceholder && `margin-right: 25px`}
`;

const Rank = styled('div')`
  background: #272c4c;
  border: 1px solid ${({ theme }) => theme.neutral600};
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin-right: 11px;
`;

const RankingRow = ({
  rank,
  name,
  amount,
  isMe,
}: {
  rank: number;
  name: string;
  amount: string;
  isMe: boolean;
}) => {
  return (
    <RankingRowContainer isMe={isMe}>
      <Rank>
        <Typography>{rank}</Typography>
      </Rank>
      <Box display='flex' justifyContent='space-between' flex={1}>
        <Name isPlaceholder={!Boolean(name)}>{name ?? '-'}</Name>
        <Amount isPlaceholder={!Boolean(amount)}>
          {amount ? `${amount} ZIG` : '-'}
        </Amount>
      </Box>
    </RankingRowContainer>
  );
};

const AuctionRanking = ({ auction }: { auction: AuctionType }) => {
  // const { t } = useTranslation('auction');
  // const { loading, error, data } = useQuery(GET_AUCTIONS);
  return (
    <Box width='100%'>
      {auction.bids === [] ? (
        auction.bids.map((bid: AuctionBidType) => (
          <RankingRow
            rank={bid.position}
            name={bid.user.username}
            amount={bid.value}
            isMe={false}
            key={bid.id}
          />
        ))
      ) : (
        <RankingRow rank={0} name={''} amount={''} isMe={false} />
      )}
    </Box>
  );
};

export default AuctionRanking;
