import { Box, css, styled, keyframes } from '@mui/material';

export const Overlay = styled(Box)<{ opacity: number }>`
  background-image: ${({ opacity }) =>
    `linear-gradient(rgba(33, 81, 78, ${opacity}), rgba(18,33,59, ${
      opacity * 0.52
    }))`};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const TierBarContainer = styled(Box)<{
  opacity: number;
  emphasis: boolean;
  subLayer?: boolean;
}>`
  border-radius: 4px;
  margin: 0 10px;
  position: relative;
  padding-top: 4px;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    padding: 1.5px;
    background: none;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    background-image: ${({ emphasis, opacity }) => `linear-gradient(
      ${emphasis ? `rgba(42, 177, 104, 0.7)` : `rgba(0, 145, 121, ${opacity})`},
      rgba(33, 81, 78, ${opacity})
    )`};
    clip-path: polygon(0 0, 100% 0, 100% 95%, 0% 95%);
  }

  ${({ subLayer }) =>
    subLayer &&
    css`
      position: absolute;
      bottom: 0;
    `}
`;

export const HighlightRate = styled(Box)`
  position: absolute;
  top: 1.5px;
  left: 0;
  right: 0;
  background: #156747;
  margin: 0 auto;
  border-radius: 2.5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const TierArrow = styled('div')`
  position: relative;
  height: 100%;
  margin-top: 12px;
  opacity: 0.3;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #28ba62;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 14px;
    background: linear-gradient(#28ba62 18%, #0c2438),
      linear-gradient(#103e50, #0c2438 100%);
  }
`;

export const BarContent0 = styled(Box)<{ subLayer: boolean }>`
  position: absolute;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ subLayer }) =>
    !subLayer &&
    css`
      transform: translateY(8%);
      justify-content: start;
    `}

  svg {
    height: 12px;
    min-height: 12px;
    width: 7.5px;
    min-width: 7.5px;
  }
`;

export const BarContent = styled(Box)<{ subLayer?: boolean }>`
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${({ subLayer }) =>
    !subLayer &&
    css`
      transform: translateY(18%);
    `}

  svg {
    opacity: 0.6;
  }
`;
const growAnimation = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: bottom;
  }
`;

export const AnimatedContainer = styled(Box)`
  animation: ${growAnimation} 0.3s ease-in-out;
`;
