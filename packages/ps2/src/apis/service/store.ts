import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphChartType, GraphTimeframe, ServiceState } from './types';

const initialState: ServiceState = {
  chartType: GraphChartType.pnl_pct_compound,
  chartTimeframe: GraphTimeframe['30d'],
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setActiveServiceId: (state, action: PayloadAction<string>) => {
      state.activeServiceId = action.payload;
    },
    setChartType: (state, action: PayloadAction<GraphChartType>) => {
      state.chartType = action.payload;
    },
    setChartTimeframe: (state, action: PayloadAction<GraphTimeframe>) => {
      state.chartTimeframe = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveServiceId, setChartTimeframe, setChartType } =
  serviceSlice.actions;

export default serviceSlice.reducer;
