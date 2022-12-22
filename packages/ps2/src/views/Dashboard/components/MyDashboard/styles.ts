import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';

export const Layout = styled(PageContainer)`
  padding-top: 120px;
`;

export const Heading = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`;

export const Inline = styled('div')`
  text-align: left;
  padding: 0 22px;
`;

export const ZigTableWrapper = styled('div')`
  td,
  th {
    &:first-of-type {
      border-right: 1px solid ${({ theme }) => theme.palette.neutral700};
    }
  }
`;
