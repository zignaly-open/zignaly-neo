import { keyframes } from '@mui/material';
import { SxProps } from '@mui/system';
import ZigRocketStarBackground from './assets/rocket-icon-star-background.svg';

export const rocketExhaustShaking = keyframes`
    0% {
        transform: translate(0, 0)
    }

    20% {
        transform: rotate(0deg) translate(0, 0)
    }

    40% {
        transform: rotate(-2deg) translate(2px, -2px)
    }

    60% {
        transform: rotate(2deg) translate(-2px, 2px)
    }

    80% {
        transform: rotate(-2deg) translate(2px, -2px)
    }

    100% {
        transform: rotate(0deg) translate(0, 0)
    }
`;

const starsMoving = keyframes`
    0% {
        background-position-y: 0
    }
    
    100% {
        background-position-y: 64px
    }
`;

export const animatedRocketStyle: SxProps = {
  '.MuiButton-endIcon': {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      pointerEvents: 'none',
      content: '""',
      top: '-20px',
      left: '0px',
      right: '-40px',
      bottom: '-20px',
      opacity: 0,
      transform: 'rotate(45deg)',
      background: `url(${ZigRocketStarBackground})`,
      transition: 'opacity .3s',
      backgroundRepeat: 'repeat-y',
    },
  },
  '.MuiButton-endIcon svg.zignaly-rocket': {
    position: 'relative',
    zIndex: 2,
  },
  '.MuiButton-endIcon svg.zignaly-rocket-exhaust': {
    position: 'absolute',
    zIndex: 1,
  },
  '&:hover .MuiButton-endIcon svg.zignaly-rocket-exhaust': {
    animation: `${rocketExhaustShaking} .3s infinite ease`,
  },
  '&:hover .MuiButton-endIcon:after': {
    opacity: 0.8,
    animation: `${starsMoving} .8s infinite linear`,
  },
};
