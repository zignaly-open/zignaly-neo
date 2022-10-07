import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/store';
import { api as userApi } from './user/api';
import dashboardReducer from './dashboard/store';
import { api as dashboardApi } from './dashboard/api';
import traderReducer from './trader/store';
import { api as traderApi } from './trader/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { api as myBalancesApi } from './myBalances/api';
import myBalancesReducer from './myBalances/store';
import { UserState } from './user/types';
import { DashboardState } from './dashboard/types';
import { MyBalancesState } from './myBalances/types';
import { TraderState } from './trader/types';

const persistConfig = {
  key: 'root',
  storage,
  // TODO: maybe we should actually leverage cache
  blacklist: [
    'userApi',
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
      [dashboardApi.reducerPath]: dashboardApi.reducer,
      [myBalancesApi.reducerPath]: myBalancesApi.reducer,
      [traderApi.reducerPath]: traderApi.reducer,
      user: userReducer,
      dashboard: dashboardReducer,
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
      .concat(dashboardApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  user: UserState;
  dashboard: DashboardState;
  myBalances: MyBalancesState;
  trader: TraderState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
