import React, { Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalAppStyle } from '@zignaly-open/ui';
import { whitelabel } from './whitelabel';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import { lazily } from 'react-lazily';

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
  // poor man's check to see if we should load a font from google
  // we assume all fonts here are available there
  // but we kinda want to check that we do not load common fonts
  const isUncommonFont = (font: string) =>
    !['Arial', 'Helvetica Neue'].includes(font);
  const fontsToLoad = [
    theme.typography.fontFamily.split(',')[0],
    whitelabel.themeOverrides?.fontFamilyH1H6?.[0],
  ]
    .filter(Boolean)
    .filter(isUncommonFont);

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
      {!!whitelabel.tools?.intercom && <IntercomStyle />}
      <GlobalStyles
        styles={{ body: { fontFamily: theme.typography.fontFamily } }}
      />
    </>
  );
};
