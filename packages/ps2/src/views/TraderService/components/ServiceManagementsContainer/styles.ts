import { styled } from '@mui/material';
import { PriceLabel, Typography } from '@zignaly-open/ui';

export const Layout = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 4em 0;
`;

export const Box = styled('div')`
  display: flex;
  min-width: 446px;
  position: relative;
  border-radius: 5px;
  padding: 24px 44px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: ${({ theme }) => theme.palette.neutral750};
  border: 1px solid ${({ theme }) => theme.palette.neutral600};
  box-shadow: inset 0 0 0 1px ${({ theme }) => theme.palette.neutral600};

  .h2 {
    margin-bottom: 8px;
  }
`;

export const BottomContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MainPriceLabel = styled(PriceLabel)`
  & > span {
    margin-top: 16px;
    justify-content: center;

    > span:nth-of-type(1) {
      color: #f3f4f6 !important;
      font-weight: 500 !important;
      font-size: 26px !important;
    }

    > span:nth-of-type(2) {
      font-size: 15px;
      color: ${({ theme }) => theme.palette.highlighted};
    }
  }
`;

export const TopConnector = styled('div')`
  height: 32px;
  border: 1px dashed ${({ theme }) => theme.palette.neutral600};
  border-bottom: none;
  border-left: none;
`;

export const TopHorizontalConnection = styled('div')`
  height: 32px;
  border-radius: 5px;
  width: calc(100% - 444px);
  border: 2px dashed ${({ theme }) => theme.palette.neutral600};
  border-bottom: none;
`;

export const HorizontalConnection = styled('div')`
  flex: 1;
  display: flex;
  align-self: center;
  border: 1px dashed ${({ theme }) => theme.palette.neutral600};
  // TODO: Changing the border for media queries knowing that it's safari doesn't work because it gets stuck in the first rendering, you have to try using images or fix nextjs xD
  // https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes
  // https://www.impressivewebs.com/comparison-css-border-style/
  border-bottom: none;
  border-left: none;
  border-left: none;
`;

export const MiddleContainer = styled('div')`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${({ theme }) => theme.palette.neutral600};
    width: 36px;
    height: 36px;
    position: absolute;

    &:first-of-type {
      left: -12px;
    }

    &:last-of-type {
      right: -12px;
    }
  }
`;

export const InlinePriceLabel = styled(PriceLabel)`
  display: inline-block;
`;

export const LabelHardDisc = styled(Typography)`
  margin: 34px 0 16px;
`;

export const LineSeparator = styled('div')`
  margin-top: 18px;
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.palette.neutral600};
`;

export const TradingFunds = styled('div')`
  display: flex;
  margin-top: 42px;
  flex-direction: column;
  align-items: flex-start;

  > span:not(:first-of-type) {
    margin-top: 18px;
    display: inline-flex;
    align-items: center;
  }

  span > span:nth-of-type(1) {
    color: ${({ theme }) => theme.palette.neutral100} !important;
    margin-left: 16px;
  }
`;

export const Circle = styled('div')`
  top: -5px;
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.neutral600};
`;
