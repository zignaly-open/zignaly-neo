import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  padding-top: 120px;
`;

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
      padding: 0;
    }
  }
  td,
  th {
    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.palette.neutral700};
    }
  }
`;
