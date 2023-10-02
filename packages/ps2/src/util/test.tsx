import React, { Suspense } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { WrappedInProviders } from '../App';
import { RootState, setupStore } from '../apis/store';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { PreloadedState } from '@reduxjs/toolkit';

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

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<PreloadedState<RootState>>;
}

export function renderWithProviders(
  ui: JSX.Element,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = setupStore(preloadedState);
  setupListeners(store.dispatch);
  return {
    store,
    ...render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>{ui}</Suspense>
      </I18nextProvider>,
      {
        wrapper: (props) => <WrappedInProviders store={store} {...props} />,
        ...renderOptions,
      },
    ),
  };
}
