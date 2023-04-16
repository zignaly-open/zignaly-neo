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
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';
function TypeTextConfirmModal(_a) {
    var close = _a.close, title = _a.title, description = _a.description, yesLabel = _a.yesLabel, yesAction = _a.yesAction, _b = _a.safeWord, safeWord = _b === void 0 ? 'Fluggaenkoecchicebolsen' : _b, yesButtonProps = _a.yesButtonProps, noLabel = _a.noLabel, noAction = _a.noAction, props = __rest(_a, ["close", "title", "description", "yesLabel", "yesAction", "safeWord", "yesButtonProps", "noLabel", "noAction"]);
    var t = useTranslation('action').t;
    var _c = useState(''), confirmWord = _c[0], setConfirmWord = _c[1];
    var typedCorrectly = (confirmWord === null || confirmWord === void 0 ? void 0 : confirmWord.toLocaleLowerCase()) !== safeWord.toLocaleLowerCase();
    return (React.createElement(ZModal, __assign({}, props, { close: close, title: title }),
        !!description && (React.createElement(ZigTypography, { sx: { mb: 1 } }, description)),
        React.createElement(ZigInput, { label: t('common:type-to-confirm', { word: safeWord }), onChange: function (e) {
                setConfirmWord(e.target.value);
            }, value: confirmWord, fullWidth: true }),
        React.createElement(Box, { sx: { mt: 2 } },
            React.createElement(ZigButton, __assign({ variant: 'contained', disabled: typedCorrectly, tooltip: typedCorrectly
                    ? t('common:type-to-confirm', { word: safeWord })
                    : undefined, type: 'submit', size: 'large', onClick: function () {
                    yesAction();
                    close();
                } }, (yesButtonProps || {})), yesLabel || t('confirm')),
            React.createElement(ZigButton, { sx: { ml: 1 }, variant: 'outlined', type: 'submit', size: 'large', onClick: function () {
                    noAction === null || noAction === void 0 ? void 0 : noAction();
                    close();
                } }, noLabel || t('cancel')))));
}
export default TypeTextConfirmModal;
//# sourceMappingURL=TypeTextConfirmModal.js.map