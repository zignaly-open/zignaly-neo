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
  hide?: boolean;
}>`
  border-radius: 4px;
  margin: 0 4px;
  position: relative;
  padding-top: 0;
  overflow: hidden;

  &::before {
    ${({ hide }) => !hide && `content: '';`}
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
    clip-path: inset(0 0 3px 0);
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

export const TierArrow = styled('div')<{ subLayer?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: ${({ subLayer }) => (subLayer ? -3 : 6)}px;
  opacity: 0.2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #28ba62;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 10px;
    background: linear-gradient(#28ba62 18%, #0c2438),
      linear-gradient(#103e50, #0c2438 100%);
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
