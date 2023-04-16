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
import React, { useEffect, useMemo } from 'react';
import TwoFAForm from '../TwoFAForm';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
function Check2FAModal(_a) {
    var close = _a.close, action = _a.action, status = _a.status, props = __rest(_a, ["close", "action", "status"]);
    var t = useTranslation(['auth', 'error']).t;
    useEffect(function () {
        if (status.isSuccess) {
            close();
        }
    }, [status.isSuccess]);
    var error = useMemo(function () {
        var _a, _b;
        var errorCode = (_b = (_a = status.error) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error.code;
        return errorCode === 13
            ? t('error:error.login-session-expired')
            : errorCode === 37
                ? t('error:error.wrong-code')
                : null;
    }, [t, status]);
    return (React.createElement(ZModal, __assign({}, props, { close: close, title: t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-title'), titleAlign: 'center' }),
        React.createElement(TwoFAForm, { clearOnError: true, onSubmit: action, isLoading: status.isLoading, error: error })));
}
export default Check2FAModal;
//# sourceMappingURL=index.js.map