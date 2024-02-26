import { Box, styled } from '@mui/material';

export const BoostBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  gap: 8px;
  padding: 2px 24px;
  height: 34px;
  box-shadow: 0 0 5px 1.5px rgba(255, 229, 105, 0.16);
  background-color: ${({ theme }) => theme.palette.neutral750};

  .MuiTypography-root {
    color: rgba(38, 196, 150, 0.9);
    font-weight: 600;
    background-image: linear-gradient(to top, #fe8401, #fec902),
      linear-gradient(to bottom, #eede75, #eede75);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  svg {
    height: 15px;
    width: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    box-shadow: unset;
    background-color: unset;
    padding: 0;
    height: auto;
  }
`;
