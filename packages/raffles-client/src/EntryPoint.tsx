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
import { Config, DAppProvider, Mumbai, Polygon } from '@usedapp/core';
import { OnboardingProvider } from './contexts/Onboarding';
import { dark, ThemeProvider } from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';
import { Toaster as ToastProvider } from 'react-hot-toast';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scripts/firebase-messaging-sw.js');
  });
}

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
  cache: new InMemoryCache({
    typePolicies: {
      Auction: {
        fields: {
          // userBid: {
          //   merge(existing, incoming, { cache, readField }) {
          //     if (!incoming) return incoming;
          //     const res = cache.readQuery({
          //       query: GET_CURRENT_USER,
          //     }) as { me: UserType };
          //     const incomingUserId = readField<number>(
          //       'id',
          //       readField('user', incoming),
          //     );
          //     // Only update userBid if it's the current user because the subscription sends other users id.
          //     if (
          //       res?.me &&
          //       res?.me.id.toString() === incomingUserId.toString()
          //     ) {
          //       return incoming;
          //     }
          //     // Keep the previous userBid although a user outbid the current user, so userBid.position is
          //     // outdated, but the rest is good.
          //     return existing;
          //   },
          // },
        },
      },
    },
  }),
});

let config: Config = {
  // https://github.com/TrueFiEng/useDApp/issues/699
  noMetamaskDeactivate: true,
};

if (process.env.REACT_APP_USE_MUMBAI_CHAIN) {
  config = {
    ...config,
    networks: [
      {
        ...Mumbai,
        // rpcUrl: 'https://rpc-mumbai.matic.today/',
        rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
        blockExplorerUrl: 'https://mumbai.polygonscan.com',
        nativeCurrency: {
          name: 'MATIC Token',
          symbol: 'MATIC',
          decimals: 18,
        },
      },
    ],
    readOnlyChainId: Mumbai.chainId,
    readOnlyUrls: {
      [Mumbai.chainId]:
        'https://polygon-mumbai.g.alchemy.com/v2/' +
        process.env.REACT_APP_ALCHEMY_PROJECT_ID,
    },
  };
} else {
  config = {
    ...config,
    networks: [
      {
        ...Polygon,
        chainName: 'Polygon Mainnet',
        rpcUrl: 'https://polygon-rpc.com/',
        blockExplorerUrl: 'https://polygonscan.com',
        nativeCurrency: {
          name: 'MATIC Token',
          symbol: 'MATIC',
          decimals: 18,
        },
      },
    ],
    readOnlyChainId: Polygon.chainId,
    readOnlyUrls: {
      [Polygon.chainId]:
        'https://polygon-mainnet.g.alchemy.com/v2/' +
        process.env.REACT_APP_ALCHEMY_PROJECT_ID,
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
            <BrowserRouter>
              <OnboardingProvider>
                <ModalProvider>
                  <Routes />
                  <ToastProvider position='top-right' />
                </ModalProvider>
              </OnboardingProvider>
            </BrowserRouter>
          </ApolloProvider>
        </DAppProvider>
      </ThemeProviderMui>
    </ThemeProvider>
  );
}

export default EntryPoint;
