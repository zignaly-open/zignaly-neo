import { Box, styled } from '@mui/material';

export const RankingHead = styled('div')`
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

export const RankingRowContainer = styled(Box)<{
  isMe?: boolean;
  hide?: boolean;
}>(({ isMe, hide, theme }) => ({
  display: 'flex',
  color: isMe ? theme.highlighted : theme.neutral100,
  padding: '6px 0',
  borderBottom: '1px solid #222249',
  [theme.breakpoints.up('md')]: {
    // Placeholder row to keep cards the same height, when 2 side by side, 1 having less than 7 rows.
    visibility: hide ? 'hidden' : 'visible',
  },
}));

export const Rank = styled('div')`
  margin: 0 14px 0 10px;
`;

export const Ellipsis = styled(RankingRowContainer)`
  align-items: center;
  height: 24px;
  padding-left: 10px;

  &:before {
    content: '...';
  }
`;
