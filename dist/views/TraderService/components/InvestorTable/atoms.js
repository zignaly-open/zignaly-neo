var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Typography } from '@zignaly-open/ui';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
var TypographyStyled = styled(Typography)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  opacity: ", ";\n\n  svg {\n    height: 16px;\n    position: relative;\n    top: 2px;\n  }\n"], ["\n  opacity: ", ";\n\n  svg {\n    height: 16px;\n    position: relative;\n    top: 2px;\n  }\n"])), function (props) { return props.opacity; });
export var YesNo = function (_a) {
    var value = _a.value;
    var t = useTranslation('common').t;
    return (React.createElement(TypographyStyled, { opacity: value ? 1 : 0.3 }, value ? (React.createElement(React.Fragment, null,
        React.createElement(CheckIcon, null),
        " ",
        t('common:yes'))) : (React.createElement(React.Fragment, null,
        React.createElement(CloseIcon, null),
        " ",
        t('common:no')))));
};
var templateObject_1;
//# sourceMappingURL=atoms.js.map