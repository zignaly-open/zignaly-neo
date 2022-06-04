import { ThemeProvider } from '@mui/material';
import React from 'react';
import Routes from './Routes';
import theme from '../theme';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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
