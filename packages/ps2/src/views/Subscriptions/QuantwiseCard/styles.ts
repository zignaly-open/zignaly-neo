import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const CrossedPrice = styled(ZigTypography)`
  position: relative;
  &::before {
    content: '';
    border-bottom: 2px solid #a9a9ba;
    position: absolute;
    width: 105%;
    height: 40%;
    transform: rotate(14deg);
  }
`;
