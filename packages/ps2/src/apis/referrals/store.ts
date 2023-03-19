import { createSlice } from '@reduxjs/toolkit';
import { ReferralsState } from './types';

const initialState: ReferralsState = {};

export const serviceSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {},
});

export default serviceSlice.reducer;
