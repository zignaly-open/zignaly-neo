import { InfoOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TooltipIcon = styled(InfoOutlined)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.palette.backgrounds.investorsIcon};
  margin: 0 0 5px 4px;
`;

export const CommissionBoostChip = styled(Box)`
  position: absolute;
  top: 12px;
  right: 0;
  transform: translate(115%);
`;
