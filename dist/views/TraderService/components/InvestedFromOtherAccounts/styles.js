var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export var InvestorData = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
export var InvestorName = styled(Typography)(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
export var InvestorSuccessFee = styled(Typography)(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
export var Field = styled('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"], ["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"])));
export var Row = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    &:first-child {\n      border-right: 1px solid ".concat(theme.palette.neutral500, ";\n    }\n  ");
});
export var Inline = styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  gap: 12px;\n  align-items: center;\n"], ["\n  display: flex;\n  gap: 12px;\n  align-items: center;\n"])));
export var Grid = styled('div')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  flex-direction: row;\n  margin-top: 12px;\n"], ["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  flex-direction: row;\n  margin-top: 12px;\n"])));
export var Column = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n\n  &:first-child {\n    border-right: 1px solid ", ";\n    padding-right: 62px;\n  }\n\n  &:last-child {\n    padding-left: 62px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n\n  &:first-child {\n    border-right: 1px solid ", ";\n    padding-right: 62px;\n  }\n\n  &:last-child {\n    padding-left: 62px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral500;
});
export var WithdrawFundsSpaceTaker = styled(Typography)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  flex: 1;\n  text-align: justify;\n"], ["\n  flex: 1;\n  text-align: justify;\n"])));
export var LoaderContainer = styled('div')(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 4em 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  padding: 4em 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
export var TransactionContainer = styled('div')(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin-top: 42px;\n"], ["\n  margin-top: 42px;\n"])));
export var Highline = styled('span')(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    color: ".concat(theme.palette.links, ";\n  ");
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=styles.js.map