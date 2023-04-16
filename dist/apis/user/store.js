var _a;
import { createSlice } from '@reduxjs/toolkit';
var initialState = {};
export var userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: function () {
            return initialState;
        },
        setAccessToken: function (state, action) {
            state.accessToken = action.payload;
        },
        setActiveExchangeInternalId: function (state, action) {
            state.activeExchangeInternalId = action.payload;
        },
        setSessionExpiryDate: function (state, action) {
            state.sessionExpiryDate = new Date(action.payload * 1000);
        },
        setUser: function (state, action) {
            state.user = action.payload;
        },
        activateExchange: function (state, action) {
            state.user.exchanges.find(function (e) { return e.internalId === action.payload; }).activated = true;
        },
        enable2FA: function (state, action) {
            state.user.ask2FA = action.payload;
        },
    },
});
export var logout = (_a = userSlice.actions, _a.logout), setAccessToken = _a.setAccessToken, setUser = _a.setUser, setSessionExpiryDate = _a.setSessionExpiryDate, setActiveExchangeInternalId = _a.setActiveExchangeInternalId, activateExchange = _a.activateExchange, enable2FA = _a.enable2FA;
export default userSlice.reducer;
//# sourceMappingURL=store.js.map