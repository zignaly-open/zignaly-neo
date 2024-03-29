import { keyframes, styled } from "@mui/system";

const handleAnimation = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    opacity: 1;
  }
`;

const ringAnimation = keyframes`
  from {
      opacity: 0.5;
      stroke-dasharray: 0, 100;
  }
  to {
    opacity: 1;
  }
`;

export const AnimatedRingSvg = styled("svg")`
  g {
    transform-origin: center;
  }

  circle {
    fill: none;
    stroke-linecap: round;
  }
`;

export const AnimatedRingCircle = styled("circle", { shouldForwardProp: () => true })`
  opacity: 0.5;
  animation: ${ringAnimation} 1s ease-out forwards;
`;

export const AnimatedHandle = styled("circle", { shouldForwardProp: () => true })`
  opacity: 0;
  animation: ${handleAnimation} 1s ease-out forwards;
  transform-origin: center;
`;
