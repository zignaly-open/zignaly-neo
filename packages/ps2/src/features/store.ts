// Dependencies
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import authReducer from './auth/store';
import coinsReducer from './coins/store';
import balancesReducer from './balances/store';

// API Reducers Paths
import { api as authApi } from './auth/api';
import { api as balancesApi } from './balances/api';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: [],
  blacklist: ['api'] as string[],
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      [authApi.reducerPath]: authApi.reducer,
      [balancesApi.reducerPath]: balancesApi.reducer,
      auth: authReducer,
      coins: coinsReducer,
      balances: balancesReducer,
    }),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
