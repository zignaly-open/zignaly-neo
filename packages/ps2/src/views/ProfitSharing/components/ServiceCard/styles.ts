import { Box, styled } from '@mui/material';

export const Card = styled(Box)`
  width: 360px;
  height: 270px;
  padding: 20px 24px;
  border-radius: 16px;
  border: solid 1px ${({ theme }) => theme.palette.neutral700};
  background-color: #121129;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  overflow: hidden;

  > a {
    align-self: self-start;
    width: auto;

    > div:first-of-type {
      width: 50px;
      height: 50px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

export const ChartContainer = styled(Box)`
  position: absolute;
  top: 140px;
  left: 0;
  right: 0;
  opacity: 0.5;
  bottom: 0;
`;

export const ValueContainer = styled('div')`
  height: 24px;
  .MuiTypography-root {
    line-height: 24px;
  }
`;

export const BottomPnLContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  right: 8px;
`;

export const ButtonContainer = styled(Box)`
  position: absolute;
  bottom: 30px;

  > div > div > div {
    height: 67px;
    > span {
      display: none;
    }
  }
`;

export const AssetContainer = styled(ValueContainer)`
  div:nth-child(2) {
    width: 14px;
    height: 14px;
  }
`;
