import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvestmentState, Investment } from './types';
import { api } from './api';

const initialState: InvestmentState = {};

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
      api.endpoints.investments.matchFulfilled,
      (state, { payload }) => {
        state.investments = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedInvestment } = dashboardSlice.actions;

export default dashboardSlice.reducer;
