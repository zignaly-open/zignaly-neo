import { Box, styled } from '@mui/material';

export const RankingRowContainer = styled(Box)<{
  isMe?: boolean;
  hide?: boolean;
}>(({ isMe, hide, theme }) => ({
  display: 'flex',
  color: isMe ? theme.highlighted : theme.neutral100,
  padding: '6px 0',
  borderBottom: '1px solid #222249',
  // Placeholder row to keep cards the same height, when 2 side by side, 1 having less than 7 rows, on medium screens.
  visibility: hide ? 'hidden' : 'visible',
}));

export const Rank = styled('div')`
  margin: 0 18px 0 10px;
`;

export const Ellipsis = styled(RankingRowContainer)`
  align-items: center;
  height: 24px;
  padding-left: 10px;

  &:before {
    content: '...';
  }
`;
