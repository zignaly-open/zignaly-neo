var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Box, styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export var Icon = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-left: 8px;\n  width: 24px;\n  height: 24px;\n  svg {\n    width: 100%;\n    height: 100%;\n  }\n"], ["\n  margin-left: 8px;\n  width: 24px;\n  height: 24px;\n  svg {\n    width: 100%;\n    height: 100%;\n  }\n"])));
export var PriceBoxOverride = styled(Box)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  span {\n    ", " !important;\n    position: relative;\n  }\n"], ["\n  span {\n    ", " !important;\n    position: relative;\n  }\n"])), function (props) { return "color: ".concat(props.theme.palette.neutral000); });
export var BlockTypography = styled(Typography)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: block;\n"], ["\n  display: block;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styles.js.map