import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 120px 52px 0 52px;
  }
  padding-top: 100px;
`;

export const Heading = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 64px;
`;

export const Inline = styled('div')`
  text-align: left;
  padding: 0 22px;
`;

export const ZigTableWrapper = styled('div')`
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
`;
