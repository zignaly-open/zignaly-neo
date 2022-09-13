import { Box, styled } from '@mui/material';
import { Typography, WalletIcon } from '@zignaly-open/ui';

export const Step = styled(Box)`
  flex-direction: column;
  align-items: center;
  display: flex;
  text-align: center;
  flex: 1;
`;

export const StepIcon = styled(WalletIcon)`
  width: 82px;
  height: 82px;
  margin-bottom: 18px;
`;

export const TypographyTitle = styled(Typography)`
  margin-bottom: 6px !important;
`;

export const Layout = styled(Box)`
  max-width: 1280px;
`;
