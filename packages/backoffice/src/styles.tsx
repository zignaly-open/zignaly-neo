import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyles } from '@mui/system';
import { useTheme } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import { getGlobalAppStyle } from '@zignaly-open/ui';

const GlobalAppStyle = getGlobalAppStyle({
  backgroundImage: `url("/background-dark.png")`,
});

// Copied from webapp-neo
const LocalFontsStyle = createGlobalStyle`
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
`;

export default () => {
  const theme = useTheme();
  return (
    <>
      <LocalFontsStyle />
      <GlobalAppStyle />
      <GoogleFontLoader
        fonts={[
          {
            font: theme.typography.fontFamily.split(',')[0],
            weights: [400, 700],
          },
        ]}
      />
      <GlobalStyles
        styles={{ body: { fontFamily: theme.typography.fontFamily } }}
      />
    </>
  );
};
