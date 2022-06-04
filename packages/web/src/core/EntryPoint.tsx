import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import Routes from './Routes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#770fc8',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: 'rgba(0, 0, 0, 0.05)',
      dark: '#191927',
      main: '#656565',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#f63f82',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      '"IBM Plex Mono"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body2: {
      fontFamily: [
        '"IBM Plex Mono"',
        '"Courier New"',
        'Monospace',
        'sans-serif',
      ].join(','),
    },
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function EntryPoint() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default EntryPoint;
