var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { PriceLabel, Typography } from '@zignaly-open/ui';
export var Layout = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  padding: 4em 0;\n"], ["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  padding: 4em 0;\n"])));
export var Box = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  min-width: 446px;\n  position: relative;\n  border-radius: 5px;\n  padding: 24px 44px;\n  text-align: center;\n  align-items: center;\n  flex-direction: column;\n  justify-content: flex-start;\n  background: ", ";\n  border: 1px solid ", ";\n  box-shadow: inset 0 0 0 1px ", ";\n\n  .h2 {\n    margin-bottom: 8px;\n  }\n"], ["\n  display: flex;\n  min-width: 446px;\n  position: relative;\n  border-radius: 5px;\n  padding: 24px 44px;\n  text-align: center;\n  align-items: center;\n  flex-direction: column;\n  justify-content: flex-start;\n  background: ", ";\n  border: 1px solid ", ";\n  box-shadow: inset 0 0 0 1px ", ";\n\n  .h2 {\n    margin-bottom: 8px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral750;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var BottomContainer = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
export var MainPriceLabel = styled(PriceLabel)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  & > span {\n    margin-top: 16px;\n    justify-content: center;\n\n    > span:nth-of-type(1) {\n      color: #f3f4f6 !important;\n      font-weight: 500 !important;\n      font-size: 26px !important;\n    }\n\n    > span:nth-of-type(2) {\n      font-size: 15px;\n      color: ", ";\n    }\n  }\n"], ["\n  & > span {\n    margin-top: 16px;\n    justify-content: center;\n\n    > span:nth-of-type(1) {\n      color: #f3f4f6 !important;\n      font-weight: 500 !important;\n      font-size: 26px !important;\n    }\n\n    > span:nth-of-type(2) {\n      font-size: 15px;\n      color: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.highlighted;
});
export var TopConnector = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 32px;\n  border: 1px dashed ", ";\n  border-bottom: none;\n  border-left: none;\n"], ["\n  height: 32px;\n  border: 1px dashed ", ";\n  border-bottom: none;\n  border-left: none;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var TopHorizontalConnection = styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 32px;\n  border-radius: 5px;\n  width: calc(100% - 444px);\n  border: 2px dashed ", ";\n  border-bottom: none;\n"], ["\n  height: 32px;\n  border-radius: 5px;\n  width: calc(100% - 444px);\n  border: 2px dashed ", ";\n  border-bottom: none;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var HorizontalConnection = styled('div')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  flex: 1;\n  display: flex;\n  align-self: center;\n  border: 1px dashed ", ";\n  // TODO: Changing the border for media queries knowing that it's safari doesn't work because it gets stuck in the first rendering, you have to try using images or fix nextjs xD\n  // https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes\n  // https://www.impressivewebs.com/comparison-css-border-style/\n  border-bottom: none;\n  border-left: none;\n  border-left: none;\n"], ["\n  flex: 1;\n  display: flex;\n  align-self: center;\n  border: 1px dashed ", ";\n  // TODO: Changing the border for media queries knowing that it's safari doesn't work because it gets stuck in the first rendering, you have to try using images or fix nextjs xD\n  // https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes\n  // https://www.impressivewebs.com/comparison-css-border-style/\n  border-bottom: none;\n  border-left: none;\n  border-left: none;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var MiddleContainer = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n\n  > svg {\n    color: ", ";\n    width: 36px;\n    height: 36px;\n    position: absolute;\n\n    &:first-of-type {\n      left: -12px;\n    }\n\n    &:last-of-type {\n      right: -12px;\n    }\n  }\n"], ["\n  width: 100%;\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n\n  > svg {\n    color: ", ";\n    width: 36px;\n    height: 36px;\n    position: absolute;\n\n    &:first-of-type {\n      left: -12px;\n    }\n\n    &:last-of-type {\n      right: -12px;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var InlinePriceLabel = styled(PriceLabel)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: inline-block;\n"], ["\n  display: inline-block;\n"])));
export var LabelHardDisc = styled(Typography)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  margin: 34px 0 16px;\n"], ["\n  margin: 34px 0 16px;\n"])));
export var LineSeparator = styled('div')(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin-top: 18px;\n  height: 1px;\n  width: 100%;\n  background: ", ";\n"], ["\n  margin-top: 18px;\n  height: 1px;\n  width: 100%;\n  background: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var TradingFunds = styled('div')(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;\n  margin-top: 42px;\n  flex-direction: column;\n  align-items: flex-start;\n\n  > span:not(:first-of-type) {\n    margin-top: 18px;\n    display: inline-flex;\n    align-items: center;\n  }\n\n  span > span:nth-of-type(1) {\n    color: ", " !important;\n    margin-left: 16px;\n  }\n"], ["\n  display: flex;\n  margin-top: 42px;\n  flex-direction: column;\n  align-items: flex-start;\n\n  > span:not(:first-of-type) {\n    margin-top: 18px;\n    display: inline-flex;\n    align-items: center;\n  }\n\n  span > span:nth-of-type(1) {\n    color: ", " !important;\n    margin-left: 16px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral100;
});
export var Circle = styled('div')(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  top: -5px;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  border-radius: 50%;\n  background: ", ";\n"], ["\n  top: -5px;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  border-radius: 50%;\n  background: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=styles.js.map