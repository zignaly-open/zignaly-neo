var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { ErrorOutline } from '@mui/icons-material';
import { styled, Box } from '@mui/material';
export var Form = styled('form')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 22px;\n  margin-top: 22px;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 22px;\n  margin-top: 22px;\n  width: 100%;\n"])));
export var Action = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-flex;\n  flex-direction: column;\n  gap: 22px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: inline-flex;\n  flex-direction: column;\n  gap: 22px;\n  align-items: center;\n  justify-content: center;\n"])));
export var Wrapper = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  padding: 12px 10px;\n  max-width: 500px;\n  background: linear-gradient(\n    90deg,\n    rgb(16 18 37) 0%,\n    rgb(16 18 37) 35%,\n    rgb(16 18 37) 100%\n  );\n  border: 1px solid #2a283a;\n  border-radius: 5px;\n"], ["\n  width: 100%;\n  padding: 12px 10px;\n  max-width: 500px;\n  background: linear-gradient(\n    90deg,\n    rgb(16 18 37) 0%,\n    rgb(16 18 37) 35%,\n    rgb(16 18 37) 100%\n  );\n  border: 1px solid #2a283a;\n  border-radius: 5px;\n"])));
export var LineBox = styled(Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  height: 10px;\n  width: 100%;\n  border-radius: 4px;\n  background: #b7bac7;\n  border: 2px solid #150448;\n  margin-bottom: 20px;\n"], ["\n  display: flex;\n  height: 10px;\n  width: 100%;\n  border-radius: 4px;\n  background: #b7bac7;\n  border: 2px solid #150448;\n  margin-bottom: 20px;\n"])));
export var ColouredLine = styled(Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  flex: 3;\n  height: 100%;\n  border-radius: 2px;\n  background: linear-gradient(100.88deg, #3f3bb1 6.99%, #138ea0 93.63%);\n"], ["\n  flex: 3;\n  height: 100%;\n  border-radius: 2px;\n  background: linear-gradient(100.88deg, #3f3bb1 6.99%, #138ea0 93.63%);\n"])));
export var TitleHead = styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  align-content: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  align-content: center;\n  justify-content: center;\n"])));
export var StyledErrorOutline = styled(ErrorOutline)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color: ", ";\n  margin-right: 8px;\n"], ["\n  color: ", ";\n  margin-right: 8px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral300;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=styles.js.map