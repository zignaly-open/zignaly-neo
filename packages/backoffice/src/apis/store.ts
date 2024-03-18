import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session/store';
import usersReducer from './users/store';
import logsReducer from './logs/store';
import transfersReducer from './transfers/store';
import configReducer from './config/store';
import backofficeApi from './baseApiBackoffice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { UserState } from './session/types';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [backofficeApi.reducerPath],
};

const appReducer = combineReducers({
  [backofficeApi.reducerPath]: backofficeApi.reducer,
  config: configReducer,
  transfers: transfersReducer,
  session: sessionReducer,
  logs: logsReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(backofficeApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  session: UserState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
