import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/store';
import ps2Api from './baseApiPs2';
import investmentReducer from './investment/store';
import serviceApiKeyReducer from './serviceApiKey/store';
import coinReducer from './coin/store';
import serviceReducer from './service/store';
import marketplaceReducer from './marketplace/store';
import referralsReducer from './referrals/store';
import settingsReducer from './settings//store';
import { api as referralApi } from './referrals/api';
import storage from 'redux-persist/lib/storage';
import {
  MigrationManifest,
  PersistedState,
  createMigrate,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { UserState } from './user/types';
import { InvestmentState } from './investment/types';
import { ServiceState } from './service/types';
import { MarketplaceState } from './marketplace/types';
import { CoinState } from './coin/types';
import { ReferralsState } from './referrals/types';
import { SettingsState } from './settings/types';

type PersistedStateV1 = PersistedState & {
  settings: {
    table: {
      marketplace: object;
    };
  };
};

const migrations: MigrationManifest = {
  1: (state: PersistedStateV1) => {
    // Reset marketplace filters & sorting
    return {
      ...state,
      settings: {
        ...state.settings,
        table: {
          ...state.settings?.table,
          marketplace: {},
        },
      },
    };
  },
};

const persistConfig = {
  key: 'root',
  version: 2,
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: [ps2Api.reducerPath, referralApi.reducerPath],
  migrate: createMigrate(migrations, { debug: false }),
};

const appReducer = combineReducers({
  [ps2Api.reducerPath]: ps2Api.reducer,
  [referralApi.reducerPath]: referralApi.reducer,
  marketplace: marketplaceReducer,
  user: userReducer,
  coin: coinReducer,
  referrals: referralsReducer,
  investment: investmentReducer,
  serviceApiKey: serviceApiKeyReducer,
  service: serviceReducer,
  settings: settingsReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, appReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(ps2Api.middleware)
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
  settings: SettingsState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
