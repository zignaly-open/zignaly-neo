import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketplaceState } from './types';

const initialState: MarketplaceState = {
  activeRowMobile: null,
};

export const serviceSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setActiveRowMobile: (state, action: PayloadAction<string>) => {
      state.activeRowMobile = action.payload;
    },
  },
});
export const { setActiveRowMobile } = serviceSlice.actions;

export default serviceSlice.reducer;
