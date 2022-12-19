import { styled } from '@mui/material';
import { ZigSelect } from '@zignaly-open/ui';

export const Header = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 88px;
  margin-top: 46px;
`;

export const StyledZigSelect = styled(ZigSelect)`
  min-width: 210px;
`;
