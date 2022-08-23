import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, Investment } from './types';

const initialState: DashboardState = {};

export const dashboardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInvestments: (
      state,
      action: PayloadAction<Investment[] | undefined>,
    ) => {
      state.investments = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInvestments } = dashboardSlice.actions;

export default dashboardSlice.reducer;
