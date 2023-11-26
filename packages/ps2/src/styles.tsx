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
import { lazily } from 'react-lazily';
import { userHasFont } from '@zignaly-open/ui';

const { AvenirNext } = lazily(() => import('@zignaly-open/ui/fonts'));

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
    .intercom-launcher-frame .intercom-lightweight-app-launcher {
      display: none !important;
    }
  }
`;

const GlobalFonts = () => {
  const theme = useTheme();
  const isAvenir = (font: string) => font === 'Avenir Next';
  const fontsToLoad = [
    theme.typography.fontFamily.split(',')[0],
    whitelabel.themeOverrides?.fontFamilyH1H6?.split(',')?.[0],
  ]
    .filter(Boolean)
    .filter((x) => !userHasFont(x));
  const shouldLoadAvenir = fontsToLoad.some(isAvenir);
  const googleFonts = fontsToLoad.filter((font) => !isAvenir(font));
  return (
    <>
      {shouldLoadAvenir && (
        <Suspense fallback={null}>
          <AvenirNext />
        </Suspense>
      )}
      {googleFonts.length > 0 && (
        <GoogleFontLoader
          fonts={googleFonts.map((font) => ({
            font,
            weights: [400, 700],
          }))}
        />
      )}
    </>
  );
};

export default () => {
  const theme = useTheme();
  return (
    <>
      <GlobalFonts />
      <GlobalAppStyle />
      {whitelabel.intercomId && <IntercomStyle />}
      <GlobalStyles
        styles={{ body: { fontFamily: theme.typography.fontFamily } }}
      />
    </>
  );
};
