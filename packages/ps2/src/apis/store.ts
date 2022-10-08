import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/store';
import { api as userApi } from './user/api';
import investmentReducer from './investment/store';
import { api as investmentApi } from './investment/api';
import coinReducer from './coin/store';
import { api as coinApi } from './coin/api';
import traderReducer from './trader/store';
import { api as traderApi } from './trader/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { api as myBalancesApi } from './myBalances/api';
import myBalancesReducer from './myBalances/store';
import { UserState } from './user/types';
import { InvestmentState } from './investment/types';
import { MyBalancesState } from './myBalances/types';
import { TraderState } from './trader/types';
import { CoinState } from './coin/types';

const persistConfig = {
  key: 'root',
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: [
    'userApi',
    'coinApi',
    'investmentApi',
    'dashboardApi',
    'myBalancesApi',
    'traderApi',
  ] as string[],
};

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      [userApi.reducerPath]: userApi.reducer,
      [myBalancesApi.reducerPath]: myBalancesApi.reducer,
      [traderApi.reducerPath]: traderApi.reducer,
      [investmentApi.reducerPath]: investmentApi.reducer,
      [coinApi.reducerPath]: coinApi.reducer,
      user: userReducer,
      coin: coinReducer,
      investment: investmentReducer,
      myBalances: myBalancesReducer,
      trader: traderReducer,
    }),
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(myBalancesApi.middleware)
      .concat(traderApi.middleware)
      .concat(coinApi.middleware)
      .concat(investmentApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState;
  coin: CoinState;
  investment: InvestmentState;
  myBalances: MyBalancesState;
  trader: TraderState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
