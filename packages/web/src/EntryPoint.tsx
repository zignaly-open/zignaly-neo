import React from 'react';
import Routes from './Routes';
import theme from './theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getToken } from './util/token';
import { DAppProvider, Polygon, Rinkeby } from '@usedapp/core';
import { OnboardingProvider } from './contexts/Onboarding';
import { dark, ThemeProvider } from 'zignaly-ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL ?? 'http://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    shouldRetry: () => true,
    url: process.env.REACT_APP_GRAPHQL_WS ?? 'ws://localhost:4000/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

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
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

let config = {};

if (process.env.REACT_APP_ENV === 'production') {
  config = {
    networks: [Polygon],
    readOnlyChainId: Polygon.chainId,
    readOnlyUrls: {
      [Polygon.chainId]:
        'https://mainnet.infura.io/v3/' +
        process.env.REACT_APP_INFURA_PROJECT_ID,
    },
  };
} else if (process.env.REACT_APP_ENV === 'development') {
  config = {
    networks: [Rinkeby],
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]:
        'https://rinkeby.infura.io/v3/' +
        process.env.REACT_APP_INFURA_PROJECT_ID,
    },
  };
}

const augmentedTheme = { ...dark, ...theme };

function EntryPoint() {
  return (
    <ThemeProvider theme={dark}>
      <ThemeProviderMui theme={augmentedTheme}>
        <DAppProvider config={config}>
          <ApolloProvider client={client}>
            <ModalProvider>
              <BrowserRouter>
                <OnboardingProvider>
                  <Routes />
                </OnboardingProvider>
              </BrowserRouter>
            </ModalProvider>
          </ApolloProvider>
        </DAppProvider>
      </ThemeProviderMui>
    </ThemeProvider>
  );
}

export default EntryPoint;
