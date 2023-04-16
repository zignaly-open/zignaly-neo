var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import Box from '@mui/system/Box/Box';
export var GradientBorderButtonWrapper = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: linear-gradient(46deg, #138ea0, #3f3bb1);\n  border-radius: 4px;\n  padding: 1px;\n  height: 42px;\n\n  &:hover {\n    background: ", ";\n    & > a {\n      background: ", " !important;\n    }\n  }\n\n  & > a {\n    height: 40px;\n    transition: background-color 0.3s;\n    background: ", " !important;\n    border-width: 0 !important;\n  }\n"], ["\n  background: linear-gradient(46deg, #138ea0, #3f3bb1);\n  border-radius: 4px;\n  padding: 1px;\n  height: 42px;\n\n  &:hover {\n    background: ", ";\n    & > a {\n      background: ", " !important;\n    }\n  }\n\n  & > a {\n    height: 40px;\n    transition: background-color 0.3s;\n    background: ", " !important;\n    border-width: 0 !important;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral800;
});
var templateObject_1;
//# sourceMappingURL=atoms.js.map