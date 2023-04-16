var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled, css } from '@mui/material';
import { styledIf, Typography } from '@zignaly-open/ui';
export var Layout = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  background: #101225;\n  border: 1px solid #35334a;\n  border-radius: 16px;\n  padding: 40px 56px;\n  ", ";\n  user-select: none;\n"], ["\n  display: flex;\n  position: relative;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n  background: #101225;\n  border: 1px solid #35334a;\n  border-radius: 16px;\n  padding: 40px 56px;\n  ", ";\n  user-select: none;\n"])), function (_a) {
    var width = _a.width;
    return width && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      width: ", "px; // TODO: responsiveness\n    "], ["\n      width: ", "px; // TODO: responsiveness\n    "])), width);
});
export var Title = styled(Typography)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  justify-content: space-between;\n"])));
export var Body = styled('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 14px;\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  color: ", ";\n  max-height: calc(100vh - 150px);\n  overflow-y: auto;\n  overflow-x: visible;\n  margin-left: -40px;\n  margin-right: -40px;\n  width: calc(100% + 80px);\n  padding-left: 40px;\n  padding-right: 40px;\n"], ["\n  font-size: 14px;\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  color: ", ";\n  max-height: calc(100vh - 150px);\n  overflow-y: auto;\n  overflow-x: visible;\n  margin-left: -40px;\n  margin-right: -40px;\n  width: calc(100% + 80px);\n  padding-left: 40px;\n  padding-right: 40px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.palette.neutral200;
});
export var Header = styled('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  z-index: 999;\n  position: relative;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  align-items: center;\n  margin-bottom: 14px;\n  ", "\n"], ["\n  display: flex;\n  z-index: 999;\n  position: relative;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  align-items: center;\n  margin-bottom: 14px;\n  ", "\n"])), function (_a) {
    var compact = _a.compact;
    return compact &&
        "\n    width: 32px;\n    position: absolute;\n    right: 56px;\n    top: 40px;\n  ";
});
export var HeaderButton = styled('button')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  border: 0;\n  padding: 0;\n  margin: 0;\n  height: 32px;\n  width: 32px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  ", "\n"], ["\n  border: 0;\n  padding: 0;\n  margin: 0;\n  height: 32px;\n  width: 32px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    svg { \n      fill: ".concat(theme.palette.neutral300, ";\n    }\n  ");
});
export var Inline = styled('div')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  ", "\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n"], ["\n  ", "\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 12px;\n"])), function (_a) {
    var align = _a.align;
    return "\n    ".concat(styledIf(align === 'center', "\n       flex: 1;\n       "), "\n  ");
});
export var ModalActions = styled('div')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 56px;\n  gap: 32px;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 56px;\n  gap: 32px;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return "\n    svg {\n      fill: ".concat(theme.palette.links, ";\n    }\n  ");
});
export var ModalActionsNew = styled('div')(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-top: 56px;\n  gap: 14px;\n  flex-direction: row;\n  width: 100%;\n  justify-content: ", ";\n"], ["\n  display: flex;\n  align-items: center;\n  margin-top: 56px;\n  gap: 14px;\n  flex-direction: row;\n  width: 100%;\n  justify-content: ", ";\n"])), function (_a) {
    var align = _a.align;
    return align === 'left'
        ? 'flex-start'
        : align === 'right'
            ? 'flex-end'
            : 'center';
});
export var AlertBlock = styled('div')(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  margin-top: 15px;\n"], ["\n  display: flex;\n  margin-top: 15px;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=styles.js.map