import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvestmentState, InvestmentServiceDetails } from './types';

const initialState: InvestmentState = {};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedInvestment: (
      state,
      action: PayloadAction<InvestmentServiceDetails>,
    ) => {
      state.selectedInvestment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedInvestment } = dashboardSlice.actions;

export default dashboardSlice.reducer;
