var _a;
import { createSlice } from '@reduxjs/toolkit';
import { GraphChartType, GraphTimeframe } from './types';
var initialState = {
    chartType: GraphChartType.pnl_pct_compound,
    chartTimeframe: GraphTimeframe['30d'],
};
export var serviceSlice = createSlice({
    name: 'service',
    initialState: initialState,
    reducers: {
        setActiveServiceId: function (state, action) {
            state.activeServiceId = action.payload;
        },
        setChartType: function (state, action) {
            state.chartType = action.payload;
        },
        setChartTimeframe: function (state, action) {
            state.chartTimeframe = action.payload;
        },
    },
});
export var setActiveServiceId = (_a = serviceSlice.actions, _a.setActiveServiceId), setChartTimeframe = _a.setChartTimeframe, setChartType = _a.setChartType;
export default serviceSlice.reducer;
//# sourceMappingURL=store.js.map