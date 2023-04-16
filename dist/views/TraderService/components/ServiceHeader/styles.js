var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { styledIf } from '@zignaly-open/ui';
export var Layout = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex-direction: row;\n  position: fixed;\n  top: 52px;\n  width: 100%;\n  right: 0;\n  left: 0;\n  background: #12152c;\n  z-index: 50;\n\n  &:after {\n    content: '';\n    left: 0;\n    bottom: 0;\n    right: 0;\n    position: absolute;\n    height: 1px;\n    background: #222249;\n  }\n"], ["\n  flex-direction: row;\n  position: fixed;\n  top: 52px;\n  width: 100%;\n  right: 0;\n  left: 0;\n  background: #12152c;\n  z-index: 50;\n\n  &:after {\n    content: '';\n    left: 0;\n    bottom: 0;\n    right: 0;\n    position: absolute;\n    height: 1px;\n    background: #222249;\n  }\n"])));
export var Container = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 25% repeat(5, minmax(0%, 100%));\n"], ["\n  display: grid;\n  grid-template-columns: 25% repeat(5, minmax(0%, 100%));\n"])));
export var Options = styled('nav')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  padding: 30px 34px;\n  gap: 14px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  padding: 30px 34px;\n  gap: 14px;\n"])));
export var Option = styled('a')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  cursor: pointer;\n  user-select: none;\n\n  ", "\n"], ["\n  cursor: pointer;\n  user-select: none;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme, active = _a.active;
    return "\n    ".concat(styledIf(active, "\n      color: ".concat(theme.palette.secondary, ";\n    "), "\n      color: ".concat(theme.palette.neutral200, ";\n      \n      &:hover {\n        color: ").concat(theme.palette.neutral150, ";\n      }        \n    ")), "\n  ");
});
export var HeadOption = styled(Option)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 56px;\n  background: #12152c;\n  border: 1px solid #222249;\n\n  ", "\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 56px;\n  background: #12152c;\n  border: 1px solid #222249;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme, active = _a.active;
    return "\n    ".concat(styledIf(!active, "\n      color: ".concat(theme.palette.neutral300, ";\n      \n      &:hover {\n        color: ").concat(theme.palette.neutral150, ";\n      }        \n    "), "\n       border-bottom: 3px solid ".concat(theme.palette.secondary, ";\n       ")), "\n  ");
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=styles.js.map