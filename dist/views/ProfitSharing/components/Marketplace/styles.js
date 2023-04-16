var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { PageContainer } from '@zignaly-open/ui';
export var Layout = styled(PageContainer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: 120px;\n"], ["\n  padding-top: 120px;\n"])));
export var Inline = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: left;\n  padding: 0 22px;\n"], ["\n  text-align: left;\n  padding: 0 22px;\n"])));
export var TableWrapper = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  td,\n  th {\n    &:first-of-type {\n      border-right: 1px solid ", ";\n    }\n  }\n"], ["\n  td,\n  th {\n    &:first-of-type {\n      border-right: 1px solid ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral700;
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styles.js.map