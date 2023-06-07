import { styled } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';

export const Layout = styled(ZigTypography)`
  text-align: center;
  display: grid;
  gap: 8px;
  justify-content: center;
`;

export const Symbol = styled(ZigTypography)`
  padding-left: 4px;
`;

export const DottedButton = styled(ZigButton)`
  border: dotted 1px #35334a;
  padding: 5px 0 !important;
  width: 65px;
  height: 25px;
  border-radius: 5px;
  font-size: 10px !important;
`;
