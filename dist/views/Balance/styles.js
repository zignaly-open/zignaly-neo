var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { ZigSelect } from '@zignaly-open/ui';
export var Header = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  margin-bottom: 88px;\n  margin-top: 46px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  margin-bottom: 88px;\n  margin-top: 46px;\n"])));
export var StyledZigSelect = styled(ZigSelect)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  min-width: 210px;\n\n  && {\n    .zig-react-select {\n      &__control {\n        padding: 0;\n        padding-right: 4px;\n      }\n\n      &__single-value {\n        font-weight: 600;\n        font-size: 11px;\n        color: ", " !important;\n        letter-spacing: 1.1px;\n      }\n    }\n  }\n"], ["\n  min-width: 210px;\n\n  && {\n    .zig-react-select {\n      &__control {\n        padding: 0;\n        padding-right: 4px;\n      }\n\n      &__single-value {\n        font-weight: 600;\n        font-size: 11px;\n        color: ", " !important;\n        letter-spacing: 1.1px;\n      }\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral300;
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=styles.js.map