import { Replay } from '@mui/icons-material';
import { css, styled } from '@mui/material/styles';

export const Video = styled('video')`
  box-shadow: 0 0 10px 2px #092234;
  border-radius: 8px;
`;

export const RefreshButton = styled(Replay)`
  position: absolute;
  right: 14px;
  bottom: 14px;
  
  transition: all 0.1s;
`;

export const Preview = styled('div')<{ isVideoEnded: boolean }>`
  position: relative;

  &:before {
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background: #0f223f87;

    transition: all 0.1s;
    opacity: 0;
    visibility: hidden;
  }

    ${({ isVideoEnded }) =>
    isVideoEnded &&
    css`
       &:before {
        opacity: 1;
        visibility: visible;
       }

              ${RefreshButton} {
          opacity: 1;
          visibility: visible;
       }
    `}

  ${({ isVideoEnded }) => `
    ${isVideoEnded &&
      `
       &:before {
        opacity: 1;
        visibility: visible;
       }
       
       ${RefreshButton} {
          opacity: 1;
          visibility: visible;
       }
    `,
      `
        ${RefreshButton} {
          opacity: 0;
          visibility: hidden;
       }
    `,
    )}
  `}
`;
