import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, Investment } from './types';
import { api } from './api';

const initialState: DashboardState = {};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedInvestment: (state, action: PayloadAction<Investment>) => {
      state.selectedInvestment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.coins.matchFulfilled,
      (state, { payload }) => {
        state.coins = payload;
      },
    );
    builder.addMatcher(
      api.endpoints.investments.matchFulfilled,
      (state, { payload }) => {
        state.investments = payload;
        state.selectedInvestmentDetails = undefined;
      },
    );
    builder.addMatcher(
      api.endpoints.investmentDetails.matchFulfilled,
      (state, { payload }) => {
        state.selectedInvestmentDetails = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedInvestment } = dashboardSlice.actions;

export default dashboardSlice.reducer;
