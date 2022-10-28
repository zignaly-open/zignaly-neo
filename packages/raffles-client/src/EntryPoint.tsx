import React from 'react';
import Routes from './Routes';
import theme from './theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  createHttpLink,
  ApolloLink,
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
import { Toaster as ToastProvider } from 'react-hot-toast';
import clock from 'util/clock';

clock.fetchTime().then(() => {
  // eslint-disable-next-line no-console
  console.log(`Clock offset detected: ${clock.getOffset()} ms`);

  // Re-apply typePolicies merges to fix dates in case if we receive
  // the server time after auctions are already cached.
  const { data } = client.cache as typeof client.cache & {
    data: { data: object };
  };
  if (Object.keys(data.data).length) {
    client.cache.reset();
  }
});

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

const updateDateWithClock = (_: string, incoming: string) => {
  return new Date(+new Date(incoming) + clock.getOffset());
};

const client = new ApolloClient({
  link: ApolloLink.from([authLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Auction: {
        fields: {
          startDate: {
            merge: updateDateWithClock,
          },
          expiresAt: {
            merge: updateDateWithClock,
          },
          maxClaimDate: {
            merge: updateDateWithClock,
          },
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
            <OnboardingProvider>
              <ModalProvider>
                <Routes />
                <ToastProvider position='top-right' />
              </ModalProvider>
            </OnboardingProvider>
          </ApolloProvider>
        </DAppProvider>
      </ThemeProviderMui>
    </ThemeProvider>
  );
}

export default EntryPoint;
