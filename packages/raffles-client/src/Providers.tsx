import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import { dark, ThemeProvider } from '@zignaly-open/ui';
import Web3Provider from 'components/Web3Provider';
import { apolloClient } from 'config/apollo';
import ModalProvider from 'mui-modal-provider';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'state';
import { OnboardingProvider } from './contexts/Onboarding';
import { augmentedTheme } from './theme';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={dark}>
      <ThemeProviderMui theme={augmentedTheme}>
        <ReduxProvider store={store}>
          <Web3Provider>
            <ApolloProvider client={apolloClient}>
              <OnboardingProvider>
                <ModalProvider>{children}</ModalProvider>
              </OnboardingProvider>
            </ApolloProvider>
          </Web3Provider>
        </ReduxProvider>
      </ThemeProviderMui>
    </ThemeProvider>
  );
};
