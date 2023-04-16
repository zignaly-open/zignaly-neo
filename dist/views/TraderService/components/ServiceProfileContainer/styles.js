var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled, css, Grid } from '@mui/material';
import muiStyled from '@emotion/styled';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ZigTypography } from '@zignaly-open/ui';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
export var LinkIconWithSafariFix = muiStyled(LinkIcon)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 13px !important;\n  height: 13px !important; \n"], ["\n  width: 13px !important;\n  height: 13px !important; \n"])));
export var GreySubHeader = muiStyled(ZigTypography)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-weight: 500 !important;\n  font-size: 13px !important;\n  line-height: 20px !important;\n  color: ", " !important;\n  margin-top: 4px;\n  white-space: nowrap;\n  margin-bottom: 4px;\n"], ["\n  font-weight: 500 !important;\n  font-size: 13px !important;\n  line-height: 20px !important;\n  color: ", " !important;\n  margin-top: 4px;\n  white-space: nowrap;\n  margin-bottom: 4px;\n"])), function (props) { return props.theme.palette.neutral200; });
export var GreySubHeaderHighlight = styled(GreySubHeader)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  // no highlight lol\n"], ["\n  // no highlight lol\n"])));
export var ServiceHeader = styled(ZigTypography)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-weight: 500 !important;\n  font-size: 18px !important;\n  line-height: 28px !important;\n  color: ", " !important;\n"], ["\n  font-weight: 500 !important;\n  font-size: 18px !important;\n  line-height: 28px !important;\n  color: ", " !important;\n"])), function (props) { return props.theme.palette.almostWhite; });
export var LiquidatedLabel = muiStyled(Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  border-radius: 5px;\n  \n  span {\n    text-transform: uppercase\n  }\n"], ["\n  border: 1px solid ", ";\n  border-radius: 5px;\n  \n  span {\n    text-transform: uppercase\n  }\n"])), function (props) { return props.theme.palette.redGraphOrError; });
export var StyledVerifiedIcon = styled(VerifiedIcon)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  fill: ", " !important;\n  color: ", " !important;\n  width: 16px !important;\n  height: 16px !important;\n  vertical-align: sub;\n  margin-left: 3px;\n  display: inline-block;\n"], ["\n  fill: ", " !important;\n  color: ", " !important;\n  width: 16px !important;\n  height: 16px !important;\n  vertical-align: sub;\n  margin-left: 3px;\n  display: inline-block;\n"])), function (props) { return props.theme.palette.greenGraph; }, function (props) { return props.theme.palette.avatarBack; });
var iconStyle = css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 16px !important;\n  height: 16px !important;\n  vertical-align: sub;\n  margin-right: 3px;\n  display: inline-block;\n"], ["\n  width: 16px !important;\n  height: 16px !important;\n  vertical-align: sub;\n  margin-right: 3px;\n  display: inline-block;\n"])));
export var StyledCalendarMonthIcon = styled(CalendarMonthIcon)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), iconStyle);
export var StyledPersonIcon = styled(PersonIcon)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), iconStyle);
export var StyledChevronRightIcon = styled(ChevronRightIcon)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  fill: ", ";\n  margin-top: 1px;\n"], ["\n  fill: ", ";\n  margin-top: 1px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral300;
});
export var StyledPencilIcon = styled(EditIcon)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  fill: ", ";\n  padding: 3px;\n  padding-right: 0;\n  margin-top: 1px;\n  position: relative;\n  left: 2px;\n"], ["\n  fill: ", ";\n  padding: 3px;\n  padding-right: 0;\n  margin-top: 1px;\n  position: relative;\n  left: 2px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral300;
});
export var Separator = styled('span')(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  margin-left: 13px;\n  margin-right: 13px;\n  flex: 0 0 1px;\n  height: 15px;\n"], ["\n  margin-left: 13px;\n  margin-right: 13px;\n  flex: 0 0 1px;\n  height: 15px;\n"])));
export var InvestButtonContainer = styled('div')(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  text-align: center;\n  height: 88px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"], ["\n  text-align: center;\n  height: 88px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"])));
export var BigNumberWrapperInvested = styled('div')(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  span {\n    font-weight: 500;\n    font-size: 22px !important;\n    line-height: 36px !important;\n  }\n"], ["\n  span {\n    font-weight: 500;\n    font-size: 22px !important;\n    line-height: 36px !important;\n  }\n"])));
export var BigNumberWrapper = styled('div')(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  & > div span {\n    font-weight: 500;\n    font-size: 22px !important;\n    line-height: 36px !important;\n  }\n"], ["\n  & > div span {\n    font-weight: 500;\n    font-size: 22px !important;\n    line-height: 36px !important;\n  }\n"])));
export var CountryFlag = styled('img')(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  width: 21px;\n  height: 14px;\n  line-height: 1;\n  margin-left: 6px;\n"], ["\n  width: 21px;\n  height: 14px;\n  line-height: 1;\n  margin-left: 6px;\n"])));
export var HideReadMoreEffects = styled('div')(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  transition: all 0.3s;\n  overflow: hidden;\n  margin-bottom: 7px;\n  max-height: ", ";\n"], ["\n  transition: all 0.3s;\n  overflow: hidden;\n  margin-bottom: 7px;\n  max-height: ", ";\n"])), function (props) { return (props.open ? '100%' : "".concat(props.heightLimit, "px")); });
export var MarkdownContainer = styled('div')(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  * {\n    color: ", ";\n  }\n\n  hr {\n    color: transparent;\n    border-top: 0.5px dashed ", ";\n    border-bottom-width: 0 !important;\n  }\n\n  ul,\n  ol {\n    padding-inline-start: 15px;\n  }\n\n  li {\n    list-style-type: disc;\n  }\n"], ["\n  * {\n    color: ", ";\n  }\n\n  hr {\n    color: transparent;\n    border-top: 0.5px dashed ", ";\n    border-bottom-width: 0 !important;\n  }\n\n  ul,\n  ol {\n    padding-inline-start: 15px;\n  }\n\n  li {\n    list-style-type: disc;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral200;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral500;
});
export var GridWithBottomBorder = styled(Grid)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  border-bottom: 0.5px solid ", ";\n"], ["\n  border-bottom: 0.5px solid ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
});
export var GridCell = styled(Grid)(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  text-align: center;\n  border-right: 0.5px solid\n    ", ";\n\n  & > span:first-child {\n    display: block;\n    margin-bottom: 10px;\n  }\n"], ["\n  text-align: center;\n  border-right: 0.5px solid\n    ", ";\n\n  & > span:first-child {\n    display: block;\n    margin-bottom: 10px;\n  }\n"])), function (_a) {
    var theme = _a.theme, rightBorder = _a.rightBorder;
    return rightBorder ? theme.palette.neutral700 : 'transparent';
});
export var PercentChangeContainer = styled(ZigTypography)(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  justify-content: center;\n  display: flex;\n  white-space: nowrap;\n  flex-direction: row;\n"], ["\n  justify-content: center;\n  display: flex;\n  white-space: nowrap;\n  flex-direction: row;\n"])));
export var RightSideActionWrapper = styled(Box)(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  min-height: 140px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"], ["\n  min-height: 140px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"])));
export var ChartWrapper = styled(Box)(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  display: flex;\n  margin-left: -20px;\n  min-height: 306px;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  margin-left: -20px;\n  min-height: 306px;\n  align-items: center;\n  justify-content: center;\n"])));
export var PercentageIndicatorSmall = styled(ZigTypography)(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  position: relative;\n  top: -1.5px;\n  font-size: 12px !important;\n"], ["\n  position: relative;\n  top: -1.5px;\n  font-size: 12px !important;\n"])));
export var GraphPercentageWrapperBox = styled(Box)(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  & > * {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n  }\n"], ["\n  & > * {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n  }\n"])));
export var SqueezedButtonGroupWrapper = styled(Box)(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  .MuiButton-root {\n    min-width: 55px !important;\n  }\n"], ["\n  .MuiButton-root {\n    min-width: 55px !important;\n  }\n"])));
export var AssetsInPoolWrapper = styled(Box)(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  & > .MuiBox-root > .MuiBox-root:first-child {\n    margin-bottom: 8px;\n  }\n"], ["\n  & > .MuiBox-root > .MuiBox-root:first-child {\n    margin-bottom: 8px;\n  }\n"])));
export var SelectWrapperBox = styled(Box)(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  height: 30px;\n\n  .zig-react-select__control {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n"], ["\n  height: 30px;\n\n  .zig-react-select__control {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28;
//# sourceMappingURL=styles.js.map