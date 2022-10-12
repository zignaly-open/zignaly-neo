import { createSlice } from '@reduxjs/toolkit';
import { CoinState } from './types';

const initialState: CoinState = {};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = coinsSlice.actions;

export default coinsSlice.reducer;
