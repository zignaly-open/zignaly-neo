var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { connectionStateColor } from './types';
export var Value = styled('span')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-weight: 600;\n  font-size: 16px;\n  line-height: 20px;\n"], ["\n  font-weight: 600;\n  font-size: 16px;\n  line-height: 20px;\n"])));
export var Layout = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), function (_a) {
    var stateId = _a.stateId, theme = _a.theme;
    return "\n    color: ".concat(connectionStateColor(theme)[stateId], ";\n  ");
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map