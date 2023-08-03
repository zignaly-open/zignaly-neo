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
  top: -14px;
  margin-left: 6px;
  margin-right: 20px;
  position: relative;
  width: 49px;
  height: 54px;
`;

export const InviteUrlInput = styled('input')`
  font-family: inherit;
  width: 390px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  letter-spacing: 0.56px;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  background: transparent;
`;
