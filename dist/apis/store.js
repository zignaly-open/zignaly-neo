var _a;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from './user/store';
import ps2Api from './baseApiPs2';
import investmentReducer from './investment/store';
import serviceApiKeyReducer from './serviceApiKey/store';
import coinReducer from './coin/store';
import serviceReducer from './service/store';
import marketplaceReducer from './marketplace/store';
import walletReducer from './wallet/store';
import { api as walletApi } from './wallet//api';
import referralsReducer from './referrals/store';
import { api as referralApi } from './referrals/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
var persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [
        ps2Api.reducerPath,
        walletApi.reducerPath,
        referralApi.reducerPath,
    ],
};
var appReducer = combineReducers((_a = {},
    _a[ps2Api.reducerPath] = ps2Api.reducer,
    _a[walletApi.reducerPath] = walletApi.reducer,
    _a[referralApi.reducerPath] = referralApi.reducer,
    _a.marketplace = marketplaceReducer,
    _a.user = userReducer,
    _a.coin = coinReducer,
    _a.referrals = referralsReducer,
    _a.investment = investmentReducer,
    _a.serviceApiKey = serviceApiKeyReducer,
    _a.service = serviceReducer,
    _a.wallet = walletReducer,
    _a));
var rootReducer = function (state, action) {
    if (logout.match(action)) {
        state = undefined;
    }
    return appReducer(state, action);
};
export var store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(ps2Api.middleware)
            .concat(walletApi.middleware)
            .concat(referralApi.middleware);
    },
});
export var persistor = persistStore(store);
//# sourceMappingURL=store.js.map