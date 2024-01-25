import { Box, styled } from '@mui/material';
import { MarginContainer } from '@zignaly-open/ui';

export const PageWithHeaderContainer = styled(MarginContainer)<{
  hasHeader?: boolean;
}>`
  padding: ${(props) => (props.hasHeader !== false ? 108 : 50)}px 22px 0 !important;
`;

export const ErrorWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.backgrounds.toastError};
  padding: 15px 15px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.backgrounds.toastError};
`;
