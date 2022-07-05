import React from 'react';
import { styled } from '@mui/material/styles';
// import { useQuery } from '@apollo/client';
// import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Typography } from 'zignaly-ui';

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
  amount: number;
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

const AuctionRanking = () => {
  // const { t } = useTranslation('auction');
  // const { loading, error, data } = useQuery(GET_AUCTIONS);

  return (
    <Box width='100%'>
      <RankingRow rank={1} name='Test User' amount={100} isMe={false} />
      <RankingRow rank={2} name={null} amount={null} isMe={false} />
      <RankingRow rank={3} name={null} amount={null} isMe={false} />
      <RankingRow rank={4} name={null} amount={null} isMe={false} />
      <RankingRow rank={5} name={null} amount={null} isMe={false} />
    </Box>
  );
};

export default AuctionRanking;
