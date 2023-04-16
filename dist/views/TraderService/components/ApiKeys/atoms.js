var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Box, styled } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';
export var ApiKeysContainer = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  gap: 24px;\n  margin-bottom: 80px;\n"], ["\n  gap: 24px;\n  margin-bottom: 80px;\n"])));
export var TitleBox = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding-bottom: 32px;\n  margin-bottom: 32px;\n  margin-top: 32px;\n  border-bottom: 1px solid ", ";\n"], ["\n  padding-bottom: 32px;\n  margin-bottom: 32px;\n  margin-top: 32px;\n  border-bottom: 1px solid ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
});
export var ApiKey = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 20px 0;\n  border-bottom: 1px solid ", ";\n  &:last-child {\n    border-bottom-width: 0;\n  }\n"], ["\n  padding: 20px 0;\n  border-bottom: 1px solid ", ";\n  &:last-child {\n    border-bottom-width: 0;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
});
export var TextWrapperRow = styled(Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-top: 6px;\n"], ["\n  margin-top: 6px;\n"])));
export var MultilineLabel = function (_a) {
    var title = _a.title, subtitle = _a.subtitle;
    return (React.createElement(Box, { sx: { flexDirection: 'column', display: 'flex' } },
        React.createElement(ZigTypography, null, title),
        React.createElement(ZigTypography, { color: 'neutral400', variant: 'caption' }, subtitle)));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=atoms.js.map