import { styled } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';

export const Layout = styled(ZigTypography)`
  text-align: center;
  display: grid;
  gap: 8px;
`;

export const DottedButton = styled(ZigButton)`
  border: dotted 1px ${(props) => props.theme.palette.neutral600};
  width: 68px;
  height: 25px;
  border-radius: 5px;
  font-size: 11px !important;
  margin: 0 auto;
`;
