import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from './user/store';
import ps2Api from './baseApiPs2';
import investmentReducer from './investment/store';
import serviceApiKeyReducer from './serviceApiKey/store';
import coinReducer from './coin/store';
import serviceReducer from './service/store';
import marketplaceReducer from './marketplace/store';
import walletReducer from './wallet/store';
import { api as walletApi } from './wallet//api';
import referralsReducer from './referrals/store';
import { api as referralApi } from './referrals/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { UserState } from './user/types';
import { InvestmentState } from './investment/types';
import { ServiceState } from './service/types';
import { MarketplaceState } from './marketplace/types';
import { CoinState } from './coin/types';
import { WalletState } from './wallet/types';
import { ReferralsState } from './referrals/types';

const persistConfig = {
  key: 'root',
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: [
    ps2Api.reducerPath,
    walletApi.reducerPath,
    referralApi.reducerPath,
  ],
};

const appReducer = combineReducers({
  [ps2Api.reducerPath]: ps2Api.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [referralApi.reducerPath]: referralApi.reducer,
  marketplace: marketplaceReducer,
  user: userReducer,
  coin: coinReducer,
  referrals: referralsReducer,
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
      .concat(walletApi.middleware)
      .concat(referralApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState;
  coin: CoinState;
  marketplace: MarketplaceState;
  referrals: ReferralsState;
  investment: InvestmentState;
  service: ServiceState;
  wallet: WalletState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
