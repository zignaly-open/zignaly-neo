import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { WrappedInProviders } from '../App';
import { store } from '../apis/store';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import ModalProvider from 'mui-modal-provider';
import { Provider } from 'react-redux';

// todo: maybe make it a fuly functional smth and use properly
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  resources: { en: { common: {} } },
});

export function renderWithProviders(ui: JSX.Element, renderOptions = {}) {
  setupListeners(store.dispatch);
  return {
    store,
    ...render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ModalProvider>
            <Suspense fallback={null}>{ui}</Suspense>
          </ModalProvider>
        </I18nextProvider>
      </Provider>,
      {
        wrapper: WrappedInProviders,
        ...renderOptions,
      },
    ),
  };
}
