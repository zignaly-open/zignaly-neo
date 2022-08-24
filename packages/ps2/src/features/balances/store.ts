import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

export const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<object[]>) => action.payload,
  },
});

export const { setBalances } = balancesSlice.actions;

export default balancesSlice.reducer;
