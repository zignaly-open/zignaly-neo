import { styled } from '@mui/material';
import Box from '@mui/system/Box/Box';

export const ButtonWrapper = styled(Box)`
  button {
    border: solid 1px ${({ theme }) => theme.palette.neutral600}80;
    border-radius: 5px;
    padding: 0 8px;
    height: 42px;
    transition: background-color 0.3s;

    &:hover {
      background: ${({ theme }) => theme.palette.neutral700};
      border-color: ${({ theme }) => theme.palette.neutral600};
    }
  }
`;
