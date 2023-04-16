import { createSlice } from '@reduxjs/toolkit';
var initialState = {};
export var dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        setSelectedInvestment: function (state, action) {
            state.selectedInvestment = action.payload;
        },
    },
});
export var setSelectedInvestment = dashboardSlice.actions.setSelectedInvestment;
export default dashboardSlice.reducer;
//# sourceMappingURL=store.js.map