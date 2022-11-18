import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { load, save } from 'redux-localstorage-simple';
import { updateVersion } from './global/actions';
import user from 'state/user/reducer';

const PERSISTED_KEYS: string[] = [];

const store = configureStore({
  reducer: { user },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(
      save({ states: PERSISTED_KEYS, debounce: 1000 }),
    ),
  preloadedState: load({
    states: PERSISTED_KEYS,
    disableWarnings: true,
  }),
});

store.dispatch(updateVersion());

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
