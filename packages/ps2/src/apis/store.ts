import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/store';
import { api as userApi } from './user/api';
import investmentReducer from './investment/store';
import { api as investmentApi } from './investment/api';
import coinReducer from './coin/store';
import { api as coinApi } from './coin/api';
import serviceReducer from './service/store';
import { api as serviceApi } from './service/api';
import marketplaceReducer from './marketplace/store';
import { api as marketplaceApi } from './marketplace/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { UserState } from './user/types';
import { InvestmentState } from './investment/types';
import { ServiceState } from './service/types';
import { MarketplaceState } from './marketplace/types';
import { CoinState } from './coin/types';

const persistConfig = {
  key: 'root',
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: [
    'userApi',
    'marketplaceApi',
    'coinApi',
    'investmentApi',
    'dashboardApi',
    'serviceApi',
  ] as string[],
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      [userApi.reducerPath]: userApi.reducer,
      [serviceApi.reducerPath]: serviceApi.reducer,
      [investmentApi.reducerPath]: investmentApi.reducer,
      [marketplaceApi.reducerPath]: marketplaceApi.reducer,
      [coinApi.reducerPath]: coinApi.reducer,
      marketplace: marketplaceReducer,
      user: userReducer,
      coin: coinReducer,
      investment: investmentReducer,
      service: serviceReducer,
    }),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(serviceApi.middleware)
      .concat(marketplaceApi.middleware)
      .concat(coinApi.middleware)
      .concat(investmentApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState;
  coin: CoinState;
  marketplace: MarketplaceState;
  investment: InvestmentState;
  service: ServiceState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
