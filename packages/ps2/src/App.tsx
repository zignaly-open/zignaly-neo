import React from 'react';
import Router from './Router';
import theme from './theme';
import * as Sentry from '@sentry/browser';
import { dark, ThemeProvider } from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { ToastContainer } from 'react-toastify';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apis/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import CenteredLoader from './components/CenteredLoader';
import Header from './components/Navigation/Header';
import UpdateChecker from './components/Navigation/UpdateChecker';

const augmentedTheme = { ...dark, ...theme };

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
  return (
    <GoogleReCaptchaProvider
      language='en'
      reCaptchaKey={process.env.REACT_APP_GOOGLE_CAPTCHA_TOKEN}
      useEnterprise={false}
      useRecaptchaNet={true}
    >
      <Provider store={store}>
        <ThemeProvider theme={dark}>
          <ThemeProviderMui theme={augmentedTheme}>
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
                  <UpdateChecker />
                  <Router />
                </ModalProvider>
              </BrowserRouter>
            </PersistGate>
          </ThemeProviderMui>
        </ThemeProvider>
      </Provider>
    </GoogleReCaptchaProvider>
  );
}

export default App;
