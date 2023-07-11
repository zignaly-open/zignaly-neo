import { styled } from '@mui/material';
import Box from '@mui/system/Box/Box';

export const GradientBorderButtonWrapper = styled(Box)`
  background: linear-gradient(46deg, #138ea0, #3f3bb1);
  border-radius: 5px;
  height: 42px;

  &:hover {
    background: ${({ theme }) => theme.palette.neutral600};
    & > div {
      background: ${({ theme }) => theme.palette.neutral700} !important;
    }
  }

  & > div {
    height: 42px;
    border-radius: 5px;
    transition: background-color 0.3s;
    background: ${({ theme }) => theme.palette.neutral900} !important;
    &,
    & > button {
      border-width: 0 !important;
    }
  }
`;
