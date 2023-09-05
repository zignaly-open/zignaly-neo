import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/store';
import backofficeApi from './baseApiBackoffice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { UserState } from './user/types';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [backofficeApi.reducerPath],
};

const appReducer = combineReducers({
  [backofficeApi.reducerPath]: backofficeApi.reducer,
  user: userReducer,
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
  user: UserState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
