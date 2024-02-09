import { Box, styled } from '@mui/material';

export const ErrorWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.backgrounds.toastError};
  margin: 30px auto;
  padding: 15px 30px;
  box-shadow: 4px 6px 4px ${({ theme }) => theme.palette.neutral900}44;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.palette.backgrounds.toastError};
`;
