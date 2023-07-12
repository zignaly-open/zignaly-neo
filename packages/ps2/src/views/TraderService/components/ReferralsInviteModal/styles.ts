import { InfoOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const InviteBox = styled(Box)`
  border-radius: 5px;
  box-shadow: 1.4px 2.1px 12px 0 rgba(0, 0, 0, 0.26);
  background-color: #1f224c;
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
  padding: 7px 12px;
`;

export const TooltipIcon = styled(InfoOutlined)`
  width: 12px;
  height: 12px;
  color: #65647e;
  margin: 0 0 5px 4px;
`;

export const CommissionBoostChip = styled(Box)`
  position: absolute;
  top: 12px;
  right: 0;
  transform: translate(100%);
`;
