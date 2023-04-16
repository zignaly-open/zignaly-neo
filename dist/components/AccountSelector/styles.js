var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';
export var Layout = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 22px;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 22px;\n"])));
export var Data = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
export var Inline = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  gap: 22px;\n"], ["\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  gap: 22px;\n"])));
export var List = styled('ul')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  user-select: none;\n"], ["\n  user-select: none;\n"])));
export var Item = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 5px;\n  cursor: pointer;\n\n  & > :first-child {\n    margin-right: 12px;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 5px;\n  cursor: pointer;\n\n  & > :first-child {\n    margin-right: 12px;\n  }\n"])));
export var InternalName = styled(Typography)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  text-overflow: ellipsis;\n  overflow: hidden;\n"], ["\n  text-overflow: ellipsis;\n  overflow: hidden;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styles.js.map