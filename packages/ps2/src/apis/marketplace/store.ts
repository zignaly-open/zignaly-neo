import { createSlice } from '@reduxjs/toolkit';
import { MarketplaceState } from './types';

const initialState: MarketplaceState = {};

export const serviceSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
});

export default serviceSlice.reducer;
