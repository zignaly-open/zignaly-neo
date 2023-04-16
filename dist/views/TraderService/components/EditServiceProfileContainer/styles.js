var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/system';
import { ZigSelect } from '@zignaly-open/ui';
import { VISIBILITY_LABEL } from './types';
export var StyledZigSelect = styled(ZigSelect)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  && {\n    .zig-react-select {\n      &__control {\n        border: ", ";\n        border-radius: 5px;\n      }\n\n      &__single-value {\n        text-align: center;\n        letter-spacing: 1.1px;\n        text-transform: uppercase;\n        font-weight: 600;\n        color: ", " !important;\n      }\n    }\n  }\n"], ["\n  && {\n    .zig-react-select {\n      &__control {\n        border: ", ";\n        border-radius: 5px;\n      }\n\n      &__single-value {\n        text-align: center;\n        letter-spacing: 1.1px;\n        text-transform: uppercase;\n        font-weight: 600;\n        color: ", " !important;\n      }\n    }\n  }\n"])), function (_a) {
    var value = _a.value;
    return "1px solid ".concat(VISIBILITY_LABEL[value].color, " !important");
}, function (_a) {
    var value = _a.value;
    return VISIBILITY_LABEL[value].color;
});
var templateObject_1;
//# sourceMappingURL=styles.js.map