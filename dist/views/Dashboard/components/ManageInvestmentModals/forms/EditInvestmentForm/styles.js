var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
export var Field = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"], ["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"])));
export var Row = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    &:first-child {\n      padding-right: 22px;\n      border-right: 1px solid ".concat(theme.palette.neutral500, ";\n    }\n  ");
});
export var AmountInvested = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n  margin-top: 12px;\n"])));
export var TokenValue = styled('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n"])));
export var InputContainer = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 68px;\n"], ["\n  margin-top: 68px;\n"])));
export var Form = styled('form')(templateObject_6 || (templateObject_6 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map