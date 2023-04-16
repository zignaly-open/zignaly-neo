var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export var Investor = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  gap: 22px;\n  align-items: center;\n  margin-bottom: 32px;\n  margin-top: 18px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  gap: 22px;\n  align-items: center;\n  margin-bottom: 32px;\n  margin-top: 18px;\n"])));
export var InvestorData = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
export var InvestorName = styled(Typography)(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
export var InvestorSuccessFee = styled(Typography)(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
export var PendingTransaction = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 12px 24px;\n  margin: 0 0 42px;\n  justify-content: space-between;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 12px 24px;\n  margin: 0 0 42px;\n  justify-content: space-between;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    gap: 22px;\n    border: 1px solid ".concat(theme.palette.yellow, ";\n    background: ").concat(theme.palette.neutral700, ";\n    border-radius: 5px;\n    \n    svg {\n      width: 14px;\n      height: 14px;\n      fill: ").concat(theme.palette.yellow, ";\n    }\n  ");
});
export var Field = styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"], ["\n  display: grid;\n  grid-template-columns: 0.9fr 1fr;\n  user-select: none;\n  gap: 42px;\n  align-items: center;\n"])));
export var Row = styled('div')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    &:first-child {\n      border-right: 1px solid ".concat(theme.palette.neutral500, ";\n    }\n  ");
});
export var Inline = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  gap: 12px;\n  align-items: center;\n"], ["\n  display: flex;\n  gap: 12px;\n  align-items: center;\n"])));
export var Grid = styled('div')(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  flex-direction: row;\n  margin-top: 12px;\n"], ["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  flex-direction: row;\n  margin-top: 12px;\n"])));
export var Column = styled('div')(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n\n  &:first-child {\n    border-right: 1px solid ", ";\n    padding-right: 62px;\n  }\n\n  &:last-child {\n    padding-left: 62px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n\n  &:first-child {\n    border-right: 1px solid ", ";\n    padding-right: 62px;\n  }\n\n  &:last-child {\n    padding-left: 62px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral500;
});
export var Content = styled('div')(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"])));
export var WithdrawFundsSpaceTaker = styled(Typography)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  flex: 1;\n  text-align: justify;\n"], ["\n  flex: 1;\n  text-align: justify;\n"])));
export var WithdrawFundsOptionWrapper = styled('div')(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  flex-direction: column;\n  gap: 15px;\n  display: flex;\n\n  height: 100%;\n"], ["\n  flex-direction: column;\n  gap: 15px;\n  display: flex;\n\n  height: 100%;\n"])));
export var WithdrawFundsButtonWrapper = styled('div')(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  text-align: center;\n\n  button {\n    min-width: 170px;\n  }\n"], ["\n  text-align: center;\n\n  button {\n    min-width: 170px;\n  }\n"])));
export var MultilineButton = styled('div')(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  padding: 15px;\n  flex-direction: column;\n  display: flex;\n"], ["\n  padding: 15px;\n  flex-direction: column;\n  display: flex;\n"])));
export var LoaderContainer = styled('div')(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  padding: 4em 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  padding: 4em 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
export var TransactionContainer = styled('div')(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  margin-top: 42px;\n"], ["\n  margin-top: 42px;\n"])));
export var WithdrawActions = styled('div')(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  margin-top: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  margin-top: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18;
//# sourceMappingURL=styles.js.map