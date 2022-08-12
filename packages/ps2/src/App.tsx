import React from 'react';
import Routes from './Routes';
import theme from './theme';
import * as Sentry from '@sentry/browser';
import { dark, ThemeProvider } from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { ToastContainer } from 'react-toastify';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import { store } from './features/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';

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

          <ThemeProviderMui theme={augmentedTheme}>
            <BrowserRouter>
              <ModalProvider>
                <Routes />
              </ModalProvider>
            </BrowserRouter>
          </ThemeProviderMui>
        </ThemeProvider>
      </Provider>
    </GoogleReCaptchaProvider>
  );
}

export default App;
