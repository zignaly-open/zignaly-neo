import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { getGlobalAppStyle } from '@zignaly-open/ui';
// TODO: fix this, smth weird with type defs not loading
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isWebpSupported } from 'react-image-webp/dist/utils';
import { whitelabel } from './whitelabel';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';

const GlobalAppStyle = getGlobalAppStyle({
  background: whitelabel.background || '#070819',
  backgroundImage:
    whitelabel.backgroundImage === null
      ? 'none'
      : `url("${
          whitelabel.backgroundImage ||
          `/images/background-dark.${isWebpSupported() ? 'webp' : 'png'}`
        }")`,
});

const IntercomStyle = createGlobalStyle`
  @media (max-width: 600px) {
    .intercom-launcher-frame .intercom-lightweight-app-launcher{
      display: none !important;
    }
  }
`;

// Copied from webapp-neo
const LocalFontsStyle = createGlobalStyle`
  ${
    !whitelabel.loadFontsFromGoogle &&
    css`
      /** Fonts **/
      @font-face {
        font-family: 'Avenir Next', sans-serif;
        src: url('/fonts/AvenirNext/AvenirNextLTPro-Regular.otf');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      @font-face {
        font-family: 'Avenir Next', sans-serif;
        src: url('/fonts/AvenirNext/AvenirNextLTPro-Bold.otf');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
    `
  }
`;

export default () => {
  const theme = useTheme();
  return (
    <>
      <LocalFontsStyle />
      <GlobalAppStyle />
      <IntercomStyle />
      {whitelabel.loadFontsFromGoogle && (
        <GoogleFontLoader
          fonts={[
            {
              font: theme.typography.fontFamily.split(',')[0],
              weights: [400, 700],
            },
          ]}
        />
      )}
      <GlobalStyles
        styles={{ body: { fontFamily: theme.typography.fontFamily } }}
      />
    </>
  );
};
