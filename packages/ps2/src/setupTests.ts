// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { store } from 'apis/store';
import { server } from './test/server';
import ps2Api from './apis/baseApiPs2';
import { api as walletApi } from './apis/wallet/api';
import { api as referralApi } from './apis/referrals/api';
import { cleanup } from '@testing-library/react';

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(ps2Api.util.resetApiState());
  store.dispatch(walletApi.util.resetApiState());
  store.dispatch(referralApi.util.resetApiState());
  cleanup();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

jest.mock('react-image-webp/dist/utils', () => ({
  isWebpSupported: () => () => true,
}));
