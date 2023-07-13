import { Box, styled } from '@mui/material';

export const BoostBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13.5px;
  background-color: ${({ theme }) => theme.palette.greenGraph}1a;
  height: 27px;
  gap: 4px;
  padding: 2px 10px;

  .MuiTypography-root {
    color: rgba(38, 196, 150, 0.9);
    font-weight: 600;
  }

  svg {
    height: 15px;
    width: auto;
  }
`;
