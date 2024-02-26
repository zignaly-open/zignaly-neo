import React, { Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalAppStyle } from '@zignaly-open/ui';
import { whitelabel } from './whitelabel';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import { lazily } from 'react-lazily';
import isFontInstalled from '@xfuturum/is-font-installed';

const PWAStyle = createGlobalStyle`
  @media (max-width: 450px) {
    html {
      min-height: calc(100% + env(safe-area-inset-top));
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);    
    }

    body {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      -webkit-touch-callout: none;
    }
  }
`;

const { AvenirNext } = lazily(() => import('@zignaly-open/ui/fonts'));

const IntercomStyle = createGlobalStyle`
  @media (max-width: 450px) {
    .intercom-launcher-frame, .intercom-lightweight-app-launcher , .intercom-launcher {
      visibility: hidden !important;
    }
  }
`;

const GlobalFonts = () => {
  const theme = useTheme();
  const isAvenir = (font: string) => font === 'Avenir Next';

  const fontsToLoad = [
    theme.typography.fontFamily.split(',')[0],
    whitelabel.themeOverrides?.fontFamilyH1H6?.[0],
  ]
    .filter(Boolean)
    .filter((f) => !isFontInstalled(f));

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
      <PWAStyle />
      {!!whitelabel.tools?.intercom && <IntercomStyle />}
      <GlobalStyles
        styles={{ body: { fontFamily: theme.typography.fontFamily } }}
      />
    </>
  );
};
