var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Typography, PriceLabel } from '@zignaly-open/ui';
export var Body = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
export var ToContainer = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 32px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 32px;\n"])));
export var ToOutline = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: linear-gradient(\n        ", ",\n        ", "\n      )\n      padding-box,\n    linear-gradient(to right, #8671f7 14.16%, #7ec9f9 83.59%) border-box;\n  border: 2px solid transparent;\n  width: 510px;\n  height: 132px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  border-radius: 16px;\n  row-gap: 16px;\n  margin-bottom: 12px;\n"], ["\n  background: linear-gradient(\n        ", ",\n        ", "\n      )\n      padding-box,\n    linear-gradient(to right, #8671f7 14.16%, #7ec9f9 83.59%) border-box;\n  border: 2px solid transparent;\n  width: 510px;\n  height: 132px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  border-radius: 16px;\n  row-gap: 16px;\n  margin-bottom: 12px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral750;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral750;
});
export var MainPriceLabel = styled(PriceLabel)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  > span {\n    font-weight: 500;\n    font-size: 26px !important;\n    line-height: 40px !important;\n    color: #f3f4f6;\n    justify-content: center;\n    margin-top: 16px;\n\n    > span:nth-of-type(1) {\n      font-weight: 500 !important;\n      font-size: 26px !important;\n    }\n\n    > span:nth-of-type(2) {\n      font-size: 15px;\n      color: ", ";\n    }\n  }\n"], ["\n  > span {\n    font-weight: 500;\n    font-size: 26px !important;\n    line-height: 40px !important;\n    color: #f3f4f6;\n    justify-content: center;\n    margin-top: 16px;\n\n    > span:nth-of-type(1) {\n      font-weight: 500 !important;\n      font-size: 26px !important;\n    }\n\n    > span:nth-of-type(2) {\n      font-size: 15px;\n      color: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.highlighted;
});
export var TypographyNumberResult = styled(Typography)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-right: 8px;\n"], ["\n  margin-right: 8px;\n"])));
export var TypographyBalance = styled(Typography)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-left: 4px;\n"], ["\n  margin-left: 4px;\n"])));
export var Inline = styled('div')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"])));
export var Actions = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-top: 56px;\n  display: flex;\n  justify-content: center;\n\n  button {\n    margin-right: 8px;\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"], ["\n  margin-top: 56px;\n  display: flex;\n  justify-content: center;\n\n  button {\n    margin-right: 8px;\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=styles.js.map