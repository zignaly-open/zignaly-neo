import { createSlice } from '@reduxjs/toolkit';
import { CoinsState } from './types';
import { api } from './api';

const initialState: CoinsState = {};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.coins.matchFulfilled,
      (state, { payload }) => {
        state.coins = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {} = coinsSlice.actions;

export default coinsSlice.reducer;
