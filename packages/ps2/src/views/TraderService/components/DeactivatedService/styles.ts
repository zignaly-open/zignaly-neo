import { Box, styled } from '@mui/material';

export const ErrorWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.backgrounds.toastError};
  padding: 15px 15px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.backgrounds.toastError};
`;
