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
import { toast } from 'react-toastify';
import { Toaster } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
var showToast = function (type) {
    return function (message, options) {
        return toast(React.createElement(Toaster, { variant: type, caption: message }), __assign({ type: type, icon: false }, options));
    };
};
var backendErrorText = function (t, error) {
    var _a;
    var _b = ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.error) || {}, code = _b.code, msg = _b.msg;
    var translationKey = 'error:error.' + code;
    return code && t(translationKey) !== translationKey.replace(/^error:/, '')
        ? t(translationKey)
        : msg || t('error:something-went-wrong');
};
var lastShownBackendError = { error: '', time: 0, expiry: 10000 };
export var backendError = function (t, error, ignoreDuplicate) {
    var text = backendErrorText(t, error);
    if (!ignoreDuplicate &&
        lastShownBackendError.error === text &&
        lastShownBackendError.time + lastShownBackendError.expiry > Date.now())
        return;
    lastShownBackendError.time = Date.now();
    lastShownBackendError.error = text;
    showToast('error')(text);
};
export function useToast() {
    var t = useTranslation('error').t;
    return {
        success: showToast('success'),
        error: showToast('error'),
        info: showToast('info'),
        backendError: function (error, ignoreDuplicate) {
            return backendError(t, error, ignoreDuplicate);
        },
    };
}
//# sourceMappingURL=useToast.js.map