import React, { Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
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
          `/background-dark.${isWebpSupported() ? 'webp' : 'png'}`
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
// const LocalFontsStyle = !whitelabel.loadFontsFromGoogle
//   ? fonts.avenirNext
//   : null;

export default () => {
  const theme = useTheme();
  return (
    <>
      <Suspense fallback={null}></Suspense>
      <GlobalAppStyle />
      {whitelabel.intercomId && <IntercomStyle />}
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
