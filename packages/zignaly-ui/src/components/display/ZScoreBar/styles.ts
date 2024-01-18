import { LinearProgress } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import ZigTypography from "../ZigTypography";

const barAnimation = (position: number) => keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(${position}%);
  }
`;

const thumbAnimation = (position: number) => keyframes`
  from {
    left: 0;
  }
  to {
    left: ${position}%;
  }
`;

const opacityAnimation = keyframes`
  to {
    opacity: 1;
  }
`;

export const StyledLinearProgress = styled(LinearProgress)<{ value: number; category: string }>`
  background: ${({ theme, category }) => theme.palette.zscore.bar[category]};
  animation: ${opacityAnimation} 1s ease-out forwards;
  opacity: 0.5;
  border-radius: 1.5px;
  height: 3px;
  > span {
    background-color: #242842;
    animation: ${({ value }) => barAnimation(value)} 1s ease-out forwards;
  }
  /* revert MuiLinearProgress styleOverrides */
  &::before {
    content: none;
  }
  .MuiLinearProgress-bar {
    width: auto;
    background-image: none;
    inset: 0px;
  }
`;

export const BarThumb = styled("span")<{ value: number }>`
  width: 6px;
  height: 6px;
  border: solid 0.6px #242842;
  background-color: #fefbf8;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  animation: ${({ value }) => thumbAnimation(value)} 1s ease-out forwards,
    ${opacityAnimation} 1s ease-out forwards;
  opacity: 0;
`;

export const TypographyPct = styled(ZigTypography)`
  position: relative;

  &::after {
    content: "%";
    font-size: 7px;
    position: relative;
    top: -5px;
  }
`;
