import { styled } from '@mui/material';

export const Inline = styled('div')`
  text-align: left;
  padding: 0 22px;
`;

export const TableWrapper = styled('div')`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    padding: 0 30px;
  }
  padding: 0;
  td {
    @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
      padding: 0 !important;
    }
  }
  td,
  th {
    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.palette.neutral700};
    }
  }

  tbody tr {
    height: 90px;
  }
`;
