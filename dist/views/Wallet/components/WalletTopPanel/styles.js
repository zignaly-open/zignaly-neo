var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { InfoOutlined } from '@mui/icons-material';
import { Grid, styled, Switch } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { withAttrs } from 'util/styles';
export var TopPanel = styled(Grid)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: #13122566;\n  border-radius: 16px;\n  margin: 21px 0 40px;\n  flex: 1;\n  padding: 40px 32px;\n  justify-content: space-around;\n\n  ", " {\n    justify-content: flex-start;\n    gap: 70px;\n  }\n"], ["\n  background: #13122566;\n  border-radius: 16px;\n  margin: 21px 0 40px;\n  flex: 1;\n  padding: 40px 32px;\n  justify-content: space-around;\n\n  ", " {\n    justify-content: flex-start;\n    gap: 70px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.breakpoints.down('sm');
});
export var PanelItem = styled(Grid)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n"], ["\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n"])));
export var StyledSwitch = styled(Switch)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  .MuiSwitch-switchBase.Mui-checked {\n    color: ", ";\n  }\n\n  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {\n    background-color: ", ";\n  }\n"], ["\n  .MuiSwitch-switchBase.Mui-checked {\n    color: ", ";\n  }\n\n  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {\n    background-color: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.greenGraph;
}, function (_a) {
    var theme = _a.theme;
    return theme.palette.greenGraph;
});
export var SubTitle = withAttrs(ZigTypography, {
    variant: 'subtitle1',
    fontWeight: 600,
    fontSize: 12,
    color: 'neutral300',
    mb: '20px',
    ml: '51px',
});
export var MinText = withAttrs(ZigTypography, {
    variant: 'h4',
    color: 'greenGraph',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
});
export var PercText = withAttrs(ZigTypography, {
    variant: 'h3',
    color: 'greenGraph',
    component: 'span',
    fontWeight: 600,
    fontSize: 20,
});
export var SwitchLabel = styled(ZigTypography)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 12px;\n  color: ", ";\n"], ["\n  font-size: 12px;\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral200;
});
export var TooltipIcon = styled(InfoOutlined)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 12px;\n  height: 12px;\n  color: #65647e;\n  margin: 0 0 5px 4px;\n"], ["\n  width: 12px;\n  height: 12px;\n  color: #65647e;\n  margin: 0 0 5px 4px;\n"])));
export var Separator = styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 1px;\n  height: 128px;\n  background: #222249;\n  align-self: center;\n  ", " {\n    display: none;\n  }\n"], ["\n  width: 1px;\n  height: 128px;\n  background: #222249;\n  align-self: center;\n  ", " {\n    display: none;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.breakpoints.down('sm');
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map