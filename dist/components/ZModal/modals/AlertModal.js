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
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';
function AlertModal(_a) {
    var close = _a.close, title = _a.title, description = _a.description, okLabel = _a.okLabel, okAction = _a.okAction, props = __rest(_a, ["close", "title", "description", "okLabel", "okAction"]);
    var t = useTranslation('action').t;
    return (React.createElement(ZModal, __assign({}, props, { close: close, title: title }),
        !!description && React.createElement(ZigTypography, null, description),
        React.createElement(Box, { sx: { mt: 2, textAlign: 'center' } },
            React.createElement(ZigButton, { sx: { mr: 1 }, variant: 'contained', type: 'submit', size: 'large', onClick: function () {
                    okAction === null || okAction === void 0 ? void 0 : okAction();
                    close();
                } }, okLabel || t('confirm')))));
}
export default AlertModal;
//# sourceMappingURL=AlertModal.js.map