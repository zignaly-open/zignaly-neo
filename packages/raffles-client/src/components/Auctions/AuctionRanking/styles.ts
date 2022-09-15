import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';

export const RankingRowContainer = styled(Typography)<{
  isMe?: boolean;
  isWinning?: boolean;
  hide?: boolean;
}>(({ isMe, isWinning, theme }) => ({
  display: 'flex',
  color: `${
    isMe ? theme.highlighted : isWinning ? theme.neutral100 : theme.neutral300
  } !important`,
  // marginTop: '18px !important',
  padding: '6px 0 !important',
  borderBottom: '1px solid #222249',
  // Placeholder row to keep cards the same height, when 2 side by side, 1 having less than 7 rows, on medium screens.
  // visibility: hide ? 'hidden' : 'visible',
}));

export const Rank = styled('span')<{ position?: number }>`
  ${({ position = 0 }) => `
    margin-right: ${position < 10 ? 18 : 10}px;
  `}
`;

export const RankingContainer = styled('div')`
  width: 100%;
`;

export const RankingList = styled('div')`
  max-height: 264px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;
