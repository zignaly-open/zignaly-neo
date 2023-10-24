import { Box, styled } from '@mui/material';

export const TableWrapper = styled(Box)`
  td {
    @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      padding: 5px 0 !important;
    }
  }
`;
