import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<object[]>) => action.payload,
  },
});

export const { setCoins } = coinsSlice.actions;

export default coinsSlice.reducer;
