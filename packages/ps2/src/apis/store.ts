import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from './ps2/user/store';
import ps2Api from './ps2/base';
import investmentReducer from './ps2/investment/store';
import serviceApiKeyReducer from './ps2/serviceApiKey/store';
import coinReducer from './ps2/coin/store';
import serviceReducer from './ps2/service/store';
import marketplaceReducer from './ps2/marketplace/store';
import walletReducer from './wallet/store';
import { api as walletApi } from './wallet//api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { UserState } from './ps2/user/types';
import { InvestmentState } from './ps2/investment/types';
import { ServiceState } from './ps2/service/types';
import { MarketplaceState } from './ps2/marketplace/types';
import { CoinState } from './ps2/coin/types';
import { WalletState } from './wallet/types';

const persistConfig = {
  key: 'root',
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: ['ps2Api', 'walletApi'],
};

const appReducer = combineReducers({
  [ps2Api.reducerPath]: ps2Api.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  marketplace: marketplaceReducer,
  user: userReducer,
  coin: coinReducer,
  investment: investmentReducer,
  serviceApiKey: serviceApiKeyReducer,
  service: serviceReducer,
  wallet: walletReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer>, action: Action) => {
  if (logout.match(action)) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(ps2Api.middleware)
      .concat(walletApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState;
  coin: CoinState;
  marketplace: MarketplaceState;
  investment: InvestmentState;
  service: ServiceState;
  wallet: WalletState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
