import React from 'react';
import Router from './Router';
import themeMui, { legacyStyledComponentsDoNotUse } from './theme';
import {
  ThemeProvider as ThemeInheritorStyled,
  ThemeProviderMui as ThemeInheritorMui,
  // has to be imported from the same module from where we call the show toast
  ToastContainer,
} from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apis/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import ZModal from './components/ZModal';
import BackofficeHeader from './components/BackofficeHeader';

export const App: React.FC = () => (
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
              <ModalProvider
                fallback={<ZModal allowUnauth wide open isLoading />}
              >
                <BackofficeHeader />
                <Router />
              </ModalProvider>
            </BrowserRouter>
          </PersistGate>
        </ThemeProviderMui>
      </ThemeInheritorMui>
    </ThemeInheritorStyled>
  </Provider>
);

export default App;
