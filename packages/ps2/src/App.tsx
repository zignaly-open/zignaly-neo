import React, { Suspense } from 'react';
import Router from './Router';
import theme from './theme';
import * as Sentry from '@sentry/browser';
import {
  CenteredLoader,
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
import UpdateChecker from './components/Navigation/UpdateChecker';
import DateLocaleFixer from './components/Navigation/DateLocaleFixer';
import Tracker from './components/Navigation/Tracker/Tracker';
import useReferralCookie from 'util/hooks/useReferralCookie';
import BottomNavigation from 'components/Navigation/BottomNavigation';

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

function App() {
  useReferralCookie();

  return (
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
            <PersistGate persistor={persistor} loading={<CenteredLoader />}>
              <BrowserRouter>
                <ModalProvider>
                  <Header />
                  <Suspense fallback={<CenteredLoader />}>
                    <>
                      <Tracker />
                      <UpdateChecker />
                      <DateLocaleFixer />
                      <ChartGradients />
                      <Router />
                      <BottomNavigation />
                    </>
                  </Suspense>
                </ModalProvider>
              </BrowserRouter>
            </PersistGate>
          </ThemeProviderMui>
        </ThemeInheritorMui>
      </ThemeInheritorStyled>
    </Provider>
  );
}

export default App;
