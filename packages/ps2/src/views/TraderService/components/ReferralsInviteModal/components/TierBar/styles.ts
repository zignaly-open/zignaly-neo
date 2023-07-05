import { Box, css, styled } from '@mui/material';

export const TierBarContainer = styled(Box)<{
  opacity: number;
  emphasis: boolean;
  subLayer: boolean;
}>`
  border-radius: 4px;
  /* background-image: linear-gradient(
    to top,
    rgba(18, 33, 59, ${({ opacity }) => opacity}),
    rgba(33, 81, 78, ${({ opacity }) => 0.48 * opacity})
  ); */
  /* background-image: linear-gradient(to top, #12213bcc, rgba(33, 81, 78, 0.8)); */
  background-image: linear-gradient(to top, #12213b, rgb(33, 81, 78));
  margin: 0 10px;
  position: relative;
  padding-top: 4px;
  overflow: hidden;
  opacity: ${({ opacity }) => opacity * 0.52};
  align-items: center;
  display: flex;
  flex-direction: column;

  ${({ subLayer }) =>
    subLayer &&
    css`
      position: absolute;
      bottom: 0;
    `}

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
    background-image: linear-gradient(
      to top,
      rgba(22, 25, 47),
      ${({ emphasis, opacity }) => (emphasis ? '#2ab168' : `rgb(0, 145, 121)`)}
    );
  }
`;

export const TierArrow = styled('div')<{ opacity: number }>`
  position: relative;
  width: 30px;
  height: 100%;
  margin-top: 42px;
  opacity: ${({ opacity }) => opacity};

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
    background: linear-gradient(#28ba62 18%, #111a30 100%),
      linear-gradient(#103e50, #111a30 100%);
  }
`;

export const BarContent = styled(Box)`
  position: absolute;
  padding-top: 6px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  svg {
    height: 12px;
    min-height: 12px;
    width: 7.5px;
    min-width: 7.5px;
  }
`;
