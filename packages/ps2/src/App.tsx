import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Router from './Router';
import {
  getZignalyThemeExport,
  ThemeOverridesType,
  ThemeProvider as ThemeInheritorStyled,
  ThemeProviderMui as ThemeInheritorMui,
  // has to be imported from the same module from where we call the show toast
  ToastContainer,
} from '@zignaly-open/ui';
import { ThemeChartGradients } from '@zignaly-open/ui/charts';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apis/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Navigation/Header';
import UpdateChecker from './components/Navigation/Checkers/UpdateChecker';
import UserKycChecker from './components/Navigation/Checkers/UserKycChecker';
import DateLocaleFixer from './components/Navigation/DateLocaleFixer';
import Tracker from './components/Navigation/Tracker/Tracker';
import useReferralCookie from 'util/hooks/useReferralCookie';
import BottomNavigation from 'components/Navigation/BottomNavigation';
import { zigSuspenseFallback } from './util/suspense';
import ZModal from './components/ZModal';
import ZigErrorBoundary from './util/ZigErrorBoundary';
import './util/i18n/i18nextWhitelabel';
import MissingExchangeChecker from 'components/Navigation/Checkers/MissingExchangeChecker';
import { whitelabel } from './whitelabel';

// import * as Sentry from '@sentry/browser';
// TODO: use Sentry
// if (
//   process.env.NODE_ENV === 'production' &&
//   process.env.REACT_APP_SENTRY_RELEASE &&
//   process.env.REACT_APP_SENTRY_DNS
// ) {
//   Sentry.init({
//     dsn: process.env.REACT_APP_SENTRY_DNS,
//     debug: false,
//     release: process.env.REACT_APP_SENTRY_RELEASE,
//   });
// }

export const WrappedInProviders: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [backofficeDebugConfigOverrides, setBackofficeDebugConfigOverrides] =
    useState<ThemeOverridesType>(null);

  useEffect(() => {
    window.addEventListener(
      'message',
      function (event) {
        // @ts-ignore
        const origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // if (origin !== 'http://localhost:8000') return;
        if (
          typeof event.data == 'object' &&
          event.data.call == 'passDebugTemplateOverride'
        ) {
          setBackofficeDebugConfigOverrides(event.data.overrides);
        }
      },
      false,
    );
  }, []);

  const { mui: themeMui, legacyStyledComponentsDoNotUse } = useMemo(() => {
    return getZignalyThemeExport(whitelabel?.theme || 'dark', [
      whitelabel.themeOverrides,
      // backofficeDebugConfigOverrides,
    ] as unknown as ThemeOverridesType[]);
  }, [backofficeDebugConfigOverrides]);

  return (
    <Provider store={store}>
      <ThemeInheritorStyled theme={legacyStyledComponentsDoNotUse}>
        <ThemeInheritorMui theme={themeMui}>
          <ThemeProviderMui theme={themeMui}>
            <GlobalStyle />
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar
              closeOnClick
              pauseOnFocusLoss
              draggable
              closeButton={false}
              pauseOnHover
              theme='dark'
            />
            <PersistGate persistor={persistor}>
              <BrowserRouter>
                <ZigErrorBoundary>
                  <Suspense fallback={zigSuspenseFallback}>
                    <ModalProvider
                      fallback={<ZModal allowUnauth wide open isLoading />}
                    >
                      {children}
                    </ModalProvider>
                  </Suspense>
                </ZigErrorBoundary>
              </BrowserRouter>
            </PersistGate>
          </ThemeProviderMui>
        </ThemeInheritorMui>
      </ThemeInheritorStyled>
    </Provider>
  );
};

function App() {
  useReferralCookie();

  return (
    <WrappedInProviders>
      <>
        <Header />
        <Suspense fallback={zigSuspenseFallback}>
          <ZigErrorBoundary>
            <Tracker />
            <UpdateChecker />
            <UserKycChecker />
            <MissingExchangeChecker />
            <DateLocaleFixer />
            <ThemeChartGradients />
            <Router />
            <BottomNavigation />
          </ZigErrorBoundary>
        </Suspense>
      </>
    </WrappedInProviders>
  );
}

export default App;
