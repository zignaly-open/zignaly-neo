var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import React from 'react';
import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
export var TransactionPanel = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  gap: 16px;\n"], ["\n  background: ", ";\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  gap: 16px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral800;
});
export var TypographyPanelLabel = styled(ZigTypography)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  && {\n    margin-right: 16px;\n    color: rgb(112, 111, 130);\n    font-weight: 400;\n    font-size: 13px;\n  }\n"], ["\n  && {\n    margin-right: 16px;\n    color: rgb(112, 111, 130);\n    font-weight: 400;\n    font-size: 13px;\n  }\n"])));
export var TypographyPanelName = styled(function (props) { return (React.createElement(ZigTypography, __assign({}, props, { variant: 'body2' }))); })(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  && {\n    color: rgb(193, 193, 200);\n  }\n"], ["\n  && {\n    color: rgb(193, 193, 200);\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styles.js.map