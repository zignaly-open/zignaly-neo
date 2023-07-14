import { Box, styled } from '@mui/material';
import { ZigInviteIcon } from '@zignaly-open/ui';

export const InviteBox = styled(Box)`
  border-radius: 5px;
  box-shadow: 1.4px 2.1px 12px 0 rgba(0, 0, 0, 0.26);
  background-color: #1f224c;
  display: flex;
  flex: 1;
  align-content: space-between;
  padding: 7px 12px;
  height: 68px;
`;

export const StyledInviteIcon = styled(ZigInviteIcon)`
  top: -11px;
  margin-left: 6px;
  margin-right: 20px;
  position: relative;
  min-width: 58px;
  height: auto;
`;
