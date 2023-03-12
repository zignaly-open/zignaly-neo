import { styled } from '@mui/material';
import Box from '@mui/system/Box/Box';

export const GradientBorderButtonWrapper = styled(Box)`
  background: linear-gradient(46deg, #138ea0, #3f3bb1);
  border-radius: 4px;
  padding: 1px;

  &:hover {
    background: ${({ theme }) => theme.palette.neutral600};
    & > a {
      background: ${({ theme }) => theme.palette.neutral700} !important;
    }
  }

  & > a {
    height: 40px;
    transition: background-color 0.3s;
    background: ${({ theme }) => theme.palette.neutral800} !important;
    border-width: 0 !important;
  }
`;
