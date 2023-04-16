var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Grid, Paper, styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
export var TotalBoxBox = styled(Paper)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 250px;\n  min-height: 160px;\n  margin: 16px;\n  border-width: 0;\n  padding: 24px 36px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n"], ["\n  width: 250px;\n  min-height: 160px;\n  margin: 16px;\n  border-width: 0;\n  padding: 24px 36px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n"])));
export var TotalBoxValue = styled(ZigTypography)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  text-align: center;\n  margin-top: 17px;\n  margin-bottom: 14px;\n  color: ", ";\n\n  &,\n  span {\n    font-size: 36px;\n  }\n"], ["\n  display: block;\n  text-align: center;\n  margin-top: 17px;\n  margin-bottom: 14px;\n  color: ", ";\n\n  &,\n  span {\n    font-size: 36px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral175;
});
export var FilterWrapperContainer = styled(Grid)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  justify-content: flex-end;\n\n  &,\n  & > .MuiBox-root {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 15px;\n  }\n\n  .zig-react-select__control {\n    width: 150px;\n  }\n"], ["\n  justify-content: flex-end;\n\n  &,\n  & > .MuiBox-root {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 15px;\n  }\n\n  .zig-react-select__control {\n    width: 150px;\n  }\n"])));
export var GetWhatYouDeserveLabel = styled(ZigTypography)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: block;\n  text-align: center;\n"], ["\n  display: block;\n  text-align: center;\n"])));
export var StepBox = styled(Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 16px;\n  img {\n    margin-top: 24px;\n    width: 100%;\n    height: 270px;\n    object-fit: contain;\n  }\n"], ["\n  padding: 16px;\n  img {\n    margin-top: 24px;\n    width: 100%;\n    height: 270px;\n    object-fit: contain;\n  }\n"])));
export var StepCounter = styled(Box)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  flex: 0 0 45px;\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  margin-right: 19px;\n"], ["\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  border: 1px solid ", ";\n  flex: 0 0 45px;\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  margin-right: 19px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral600;
});
export var RewardsListContainer = styled(Grid)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  max-width: 900px;\n  margin: 0 auto;\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n  background-color: rgba(255, 255, 255, 0.02);\n  padding-top: 20px;\n  padding-bottom: 20px;\n"], ["\n  max-width: 900px;\n  margin: 0 auto;\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n  background-color: rgba(255, 255, 255, 0.02);\n  padding-top: 20px;\n  padding-bottom: 20px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
});
export var UlList = styled('ul')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  &,\n  & li {\n    list-style: disc;\n  }\n  margin-left: 20px;\n"], ["\n  &,\n  & li {\n    list-style: disc;\n  }\n  margin-left: 20px;\n"])));
export var OlList = styled('ol')(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  &,\n  & li {\n    list-style: decimal;\n  }\n  margin-left: 20px;\n"], ["\n  &,\n  & li {\n    list-style: decimal;\n  }\n  margin-left: 20px;\n"])));
export var ShareIconsContainer = styled(Box)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  display: grid;\n  svg {\n    min-width: 40px;\n    width: 100%;\n    height: 40px;\n    margin-top: 6px;\n    margin-bottom: 6px;\n    margin-left: 6px;\n    margin-right: 6px;\n    fill: url(#shareIconGradient);\n    transition: fill 0.2s;\n    &:hover {\n      fill: #7682f7;\n    }\n  }\n"], ["\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  display: grid;\n  svg {\n    min-width: 40px;\n    width: 100%;\n    height: 40px;\n    margin-top: 6px;\n    margin-bottom: 6px;\n    margin-left: 6px;\n    margin-right: 6px;\n    fill: url(#shareIconGradient);\n    transition: fill 0.2s;\n    &:hover {\n      fill: #7682f7;\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=styles.js.map