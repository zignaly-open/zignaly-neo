import { InfoOutlined } from '@mui/icons-material';
import { Box, LinearProgress } from '@mui/material';
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

export const StyledLinearProgress = styled(LinearProgress)`
  background: linear-gradient(to right, #28bef9, #1cfd90);
  /* > span {
    background-color: red;
  } */
`;
