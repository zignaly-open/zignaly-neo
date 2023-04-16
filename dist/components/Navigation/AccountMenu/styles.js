var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export var NavList = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n\n  border-bottom: 1px solid #2c2d59;\n  padding: 12px 0;\n  gap: 8px;\n\n  &:first-child {\n    padding-top: 0;\n  }\n\n  &.last {\n    border-bottom: none;\n    padding-bottom: 0;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n\n  border-bottom: 1px solid #2c2d59;\n  padding: 12px 0;\n  gap: 8px;\n\n  &:first-child {\n    padding-top: 0;\n  }\n\n  &.last {\n    border-bottom: none;\n    padding-bottom: 0;\n  }\n"])));
export var LoginButton = styled('span')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  cursor: pointer;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  cursor: pointer;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    svg {\n      color: ".concat(theme.palette.neutral300, ";\n    }\n  ");
});
export var AccountName = styled(Typography)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  max-width: 155px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"], ["\n  max-width: 155px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"])));
export var AccountDropdown = styled('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding-top: 7px;\n  padding-bottom: 7px;\n  overflow: hidden;\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding-top: 7px;\n  padding-bottom: 7px;\n  overflow: hidden;\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=styles.js.map