import { createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import { MyBalancesState } from './types';

const initialState: MyBalancesState = {
  balances: {},
  coins: {},
};

export const myBalancesSlice = createSlice({
  name: 'myBalances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.reducedBalances.matchFulfilled,
      (state, { payload }) => {
        state.balances = payload;
      },
    );
    builder.addMatcher(
      api.endpoints.allCoins.matchFulfilled,
      (state, { payload }) => {
        state.coins = payload;
      },
    );
  },
});

export default myBalancesSlice.reducer;
