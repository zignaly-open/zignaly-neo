import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketplaceState } from './types';

const initialState: MarketplaceState = {
  mobileActiveRow: null,
};

export const serviceSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMobileActiveRow: (state, action: PayloadAction<string>) => {
      state.mobileActiveRow = action.payload;
    },
  },
});
export const { setMobileActiveRow } = serviceSlice.actions;

export default serviceSlice.reducer;
