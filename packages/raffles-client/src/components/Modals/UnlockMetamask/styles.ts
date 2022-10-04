import { RefreshOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { css, styled } from '@mui/material/styles';

export const Video = styled('video')`
  border-radius: 8px;
`;

export const Preview = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isVideoEnded',
})<{
  isVideoEnded: boolean;
}>`
  position: relative;

  &:before {
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background: #1a25369c;
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
    `}
`;

export const RefreshIcon = styled(RefreshOutlined)`
  color: #fff;
`;

export const RefreshIconButton = styled(IconButton)`
  position: absolute;
  transition: all 0.1s;
  right: 6px;
  bottom: 12px;
`;
