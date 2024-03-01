import { styled } from '@mui/material';
import { ZigPriceLabel } from '@zignaly-open/ui';

export const Layout = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 56px;
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
  background: ${({ theme }) => theme.palette.backgrounds.selectInputFill};
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

export const InlinePriceLabel = styled(ZigPriceLabel)`
  margin-left: 16px;
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
`;

export const Circle = styled('div')`
  top: -5px;
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.neutral600};
`;
