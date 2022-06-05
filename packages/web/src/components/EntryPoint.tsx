import { ThemeProvider } from '@mui/material';
import React from 'react';
import Routes from './Routes';
import theme from '../theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../util/token';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
