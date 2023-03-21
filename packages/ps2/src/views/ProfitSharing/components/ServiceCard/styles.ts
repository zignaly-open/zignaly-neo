import { Box, css, styled } from '@mui/material';

export const Card = styled(Box)`
  width: 360px;
  height: 270px;
  padding: 20px 24px;
  border-radius: 7.5px;
  border: solid 1px ${({ theme }) => theme.palette.neutral700};
  background-color: rgba(53, 51, 74, 0.3);
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

export const ChartBox = styled(Box)`
  position: absolute;
  top: 140px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const ValueContainer = styled('div')`
  height: 24px;
  .MuiTypography-root {
    line-height: 24px;
  }
`;

export const BottomPnLContainer = styled(Box)<{ negative: boolean }>`
  margin-top: -1px;
  padding-right: 4px;

  ${({ negative }) =>
    negative
      ? css`
          background-image: linear-gradient(
            to top,
            rgba(46, 0, 28, 0.24),
            rgba(37, 15, 38, 0.29)
          );
        `
      : css`
          background-image: linear-gradient(
            to top,
            rgba(0, 45, 20, 0.56),
            rgba(16, 33, 33, 0.52)
          );
        `}

  span {
    line-height: 10px !important;
  }
`;

export const ButtonContainer = styled(Box)`
  position: absolute;
  bottom: 42px;

  > div > div {
    min-width: auto;

    > button {
      background: linear-gradient(
        289.8deg,
        rgba(20, 156, 173, 0.8) 0%,
        rgba(69, 64, 193, 0.8) 100%
      );
      min-width: 135px;
      height: 50px;
    }
  }

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

  .MuiTypography-root {
    font-size: 17px;
  }
`;
