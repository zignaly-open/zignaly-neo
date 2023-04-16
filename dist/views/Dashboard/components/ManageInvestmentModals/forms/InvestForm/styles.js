var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
export var Field = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: flex-start;\n\n  & > div {\n    min-height: 110px;\n    ", ";\n  }\n"], ["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: flex-start;\n\n  & > div {\n    min-height: 110px;\n    ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    &:first-child {\n      padding-right: 42px;\n      border-right: 1px solid ".concat(theme.palette.neutral500, ";\n    }\n  ");
});
export var Form = styled('form')(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map