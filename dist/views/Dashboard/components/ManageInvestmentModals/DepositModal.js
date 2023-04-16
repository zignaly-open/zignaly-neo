var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import DepositView from './views/Deposit';
function DepositModal(_a) {
    var close = _a.close, selectedCoin = _a.selectedCoin, allowedCoins = _a.allowedCoins, props = __rest(_a, ["close", "selectedCoin", "allowedCoins"]);
    var t = useTranslation(['deposit-crypto']).t;
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { close: close, title: t('title') }),
        React.createElement(DepositView, { allowedCoins: allowedCoins, selectedCoin: selectedCoin })));
}
DepositModal.trackId = 'deposit';
export default DepositModal;
//# sourceMappingURL=DepositModal.js.map