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

// const barAnimation = keyframes`
//   from {
//       stroke-dasharray: 0, 150;

//   }
//   to {
//     opacity: 1;
//   }
// `;

export const AnimatedRingSvg = styled("svg")`
  & g {
    transform-origin: center;
  }

  /* .subrings & {
    height: 114px;
    width: 114px;
    display: block;
    transform: rotate(36deg);
  } */

  /* .bar-svg .stroke-anim {
    animation: BarProgress 1s ease-out forwards;
  } */

  & circle {
    fill: none;
    stroke-linecap: round;
  }
`;

export const AnimatedRingCircle1 = styled("circle", { shouldForwardProp: () => true })`
  opacity: 0.5;
  animation: ${ringAnimation} 1s ease-out forwards;
`;

/* export const AnimatedRingCircle2 = styled(AnimatedRingCircle1)`
  opacity: 0.5;
  animation: ${ringAnimation} 1s ease-out forwards;
  animation-delay: 01s;
  /* animation-duration: 2s; 
`; */

export const AnimatedHandle = styled("circle", { shouldForwardProp: () => true })`
  opacity: 0;
  animation: ${handleAnimation} 1s ease-out forwards;
  transform-origin: center;
`;
