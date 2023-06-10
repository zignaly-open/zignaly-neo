import React, { Suspense } from 'react';
import Router from './Router';
import theme from './theme';
import * as Sentry from '@sentry/browser';
import {
  ChartGradients,
  dark,
  ThemeProvider as ThemeInheritorStyled,
  ThemeProviderMui as ThemeInheritorMui,
} from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apis/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Navigation/Header';
import useReferralCookie from 'util/hooks/useReferralCookie';
import BottomNavigation from 'components/Navigation/BottomNavigation';
import { zigSuspenseFallback } from './util/suspense';
import ZModal from './components/ZModal';
import { ChunkLoadErrorBoundary } from './util/ChunkLoadErrorBoundary';
import { useDateLocaleFixer } from './util/i18nextHelpers';
import { useTracker } from './util/analytics';
import { useUpdateChecker } from './util/updateChecker';
import { useMobileRedirect } from './util/mobile';

if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_SENTRY_RELEASE &&
  process.env.REACT_APP_SENTRY_DNS
) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    debug: false,
    release: process.env.REACT_APP_SENTRY_RELEASE,
  });
}

export const WrappedInProviders: React.FC<{ children: JSX.Element }> = ({
  children,
}) => (
  <ChunkLoadErrorBoundary>
    <Provider store={store}>
      <ThemeInheritorStyled theme={dark}>
        <ThemeInheritorMui theme={theme}>
          <ThemeProviderMui theme={theme}>
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
                <Suspense fallback={zigSuspenseFallback}>
                  <ModalProvider
                    fallback={<ZModal allowUnauth open isLoading />}
                  >
                    {children}
                  </ModalProvider>
                </Suspense>
              </BrowserRouter>
            </PersistGate>
          </ThemeProviderMui>
        </ThemeInheritorMui>
      </ThemeInheritorStyled>
    </Provider>
  </ChunkLoadErrorBoundary>
);

function App() {
  useReferralCookie();
  useDateLocaleFixer();
  useMobileRedirect();
  useTracker();
  useUpdateChecker();

  return (
    <>
      <Header />
      <Suspense fallback={zigSuspenseFallback}>
        <>
          <ChartGradients />
          <Router />
          <BottomNavigation />
        </>
      </Suspense>
    </>
  );
}

export default () => (
  <WrappedInProviders>
    <App />
  </WrappedInProviders>
);
