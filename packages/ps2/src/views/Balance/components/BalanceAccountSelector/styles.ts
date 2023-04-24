import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const Layout = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;

export const Data = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Inline = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 22px;
`;

export const TypeText = styled(ZigTypography)`
  display: flex;
  gap: 4px;

  span:nth-of-type(1) {
    color: ${({ theme }) => theme.palette.neutral300};
  }

  span:nth-of-type(2) {
    color: ${({ theme }) => theme.palette.neutral200};
  }
`;
