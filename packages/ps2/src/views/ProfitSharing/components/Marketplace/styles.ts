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
  td,
  th {
    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.palette.neutral700};
    }
  }
`;
