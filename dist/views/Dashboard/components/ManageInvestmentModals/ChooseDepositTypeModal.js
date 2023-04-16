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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import ChooseDepositType from './views/ChooseDepositType';
import DepositView from './views/Deposit';
import { ChooseDepositTypeViews } from './types';
function ChooseDepositTypeModal(_a) {
    var _b;
    var close = _a.close, selectedCoin = _a.selectedCoin, props = __rest(_a, ["close", "selectedCoin"]);
    var t = useTranslation(['purchase-deposit-crypto', 'deposit-crypto']).t;
    var _c = useState(ChooseDepositTypeViews.ChooseDepositTypeView), view = _c[0], setView = _c[1];
    var views = (_b = {},
        _b[ChooseDepositTypeViews.ChooseDepositTypeView] = {
            title: t('purchase-deposit-crypto:title', { coin: selectedCoin }),
            component: function () { return (React.createElement(ChooseDepositType, { setView: setView, coin: selectedCoin })); },
        },
        _b[ChooseDepositTypeViews.DepositView] = {
            title: t('deposit-crypto:title'),
            component: function () { return (React.createElement(DepositView, { allowedCoins: [selectedCoin], selectedCoin: selectedCoin })); },
        },
        _b);
    var _d = views[view in views ? view : ChooseDepositTypeViews.ChooseDepositTypeView], title = _d.title, component = _d.component;
    return (React.createElement(ZModal, __assign({ wide: true }, props, { close: close, title: title }), component()));
}
ChooseDepositTypeModal.trackId = 'choose-deposit-type';
export default ChooseDepositTypeModal;
//# sourceMappingURL=ChooseDepositTypeModal.js.map