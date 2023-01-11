import { createSlice } from '@reduxjs/toolkit';
import { WalletState } from './types';

const initialState: WalletState = {};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = walletSlice.actions;

export default walletSlice.reducer;
