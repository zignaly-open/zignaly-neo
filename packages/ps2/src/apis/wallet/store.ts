import { createSlice } from '@reduxjs/toolkit';
import { WalletState } from './types';

const initialState: WalletState = {};

export const coinsSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = coinsSlice.actions;

export default coinsSlice.reducer;
