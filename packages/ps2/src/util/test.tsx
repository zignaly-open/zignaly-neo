import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { WrappedInProviders } from '../App';
import { store } from '../apis/store';

export function renderWithProviders(ui: JSX.Element, renderOptions = {}) {
  setupListeners(store.dispatch);
  return {
    store,
    ...render(<Suspense fallback={null}>{ui}</Suspense>, {
      wrapper: WrappedInProviders,
      ...renderOptions,
    }),
  };
}
