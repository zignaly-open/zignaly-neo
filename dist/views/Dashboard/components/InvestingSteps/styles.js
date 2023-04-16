var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
export var Layout = styled(PageContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: 120px;\n"], ["\n  padding-top: 120px;\n"])));
export var StepBox = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 16px;\n  img {\n    margin-top: 24px;\n    width: 100%;\n    height: 270px;\n    object-fit: contain;\n  }\n"], ["\n  padding: 16px;\n  img {\n    margin-top: 24px;\n    width: 100%;\n    height: 270px;\n    object-fit: contain;\n  }\n"])));
export var StepCounter = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  flex: 0 0 45px;\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  margin-right: 19px;\n"], ["\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  flex: 0 0 45px;\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  margin-right: 19px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styles.js.map