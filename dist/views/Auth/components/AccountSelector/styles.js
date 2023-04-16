var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { styledIf } from '@zignaly-open/ui';
export var Button = styled('button')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  background: transparent;\n  width: 100%;\n  border: none;\n  padding: 18px;\n  user-select: none;\n  border-radius: 8px 0 0 0;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  background: transparent;\n  width: 100%;\n  border: none;\n  padding: 18px;\n  user-select: none;\n  border-radius: 8px 0 0 0;\n\n  ", "\n"])), function (_a) {
    var isMenu = _a.isMenu;
    return "\n    ".concat(styledIf(isMenu, "\n      cursor: pointer;\n      &:hover {\n        background: #191A30;\n      }  \n    "), "\n  ");
});
export var Container = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  top: 100%;\n  z-index: 10;\n  background: #191a30;\n  width: 220px;\n  max-height: 300px;\n  overflow: auto;\n  border-radius: 0 0 6px 6px;\n"], ["\n  top: 100%;\n  z-index: 10;\n  background: #191a30;\n  width: 220px;\n  max-height: 300px;\n  overflow: auto;\n  border-radius: 0 0 6px 6px;\n"])));
export var Item = styled('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: transparent;\n  padding: 12px 18px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n  user-select: none;\n\n  &:hover {\n    background: #1c1d35;\n  }\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"], ["\n  background: transparent;\n  padding: 12px 18px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 12px;\n  cursor: pointer;\n  user-select: none;\n\n  &:hover {\n    background: #1c1d35;\n  }\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"])));
export var Field = styled('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  overflow: hidden;\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  overflow: hidden;\n\n  span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"])));
export var Layout = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n\n  ", "\n"], ["\n  position: relative;\n\n  ", "\n"])), function (_a) {
    var isActive = _a.isActive;
    return "\n    ".concat(styledIf(isActive, "\n      \n      ".concat(Button, " {\n        background: #191A30;\n      }\n    ")), "\n  ");
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=styles.js.map