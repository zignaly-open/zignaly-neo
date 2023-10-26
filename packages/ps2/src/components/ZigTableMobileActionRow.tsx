import { Box, styled } from '@mui/material';
import { isChrome, isSafari } from 'react-device-detect';

export const ZigTableMobileActionRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'safariHeight',
})<{ safariHeight: number }>`
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  left: 0;
  top: -2px;
  position: absolute;
  width: 100%;
  gap: 16px;

  height: ${
    // what can I say, fuck safari for iuts relative positioning and absolute positioning problems
    // setting height 100% does not resize it to the size of the parent relatively positioned tr
    // (that requires its own set of crutches to make it work in safari)
    // but instead it makes it 100vh
    // so screw it
    (props) =>
      props.safariHeight && (isSafari || isChrome)
        ? `${props.safariHeight}px`
        : '100%;'
  };
`;
