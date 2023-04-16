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
import WithdrawForm from './forms/WithdrawForm';
function WithdrawModal(_a) {
    var close = _a.close, selectedCoin = _a.selectedCoin, props = __rest(_a, ["close", "selectedCoin"]);
    var _b = useState(''), step = _b[0], setStep = _b[1];
    var t = useTranslation(['withdraw-crypto']).t;
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { close: close, title: t(step === 'success'
            ? 'success.title'
            : step === 'confirm'
                ? 'confirmation.title'
                : 'title') }),
        React.createElement(WithdrawForm, { setStep: setStep, selectedCoin: selectedCoin, close: close })));
}
WithdrawModal.trackId = 'withdraw';
export default WithdrawModal;
//# sourceMappingURL=WithdrawModal.js.map