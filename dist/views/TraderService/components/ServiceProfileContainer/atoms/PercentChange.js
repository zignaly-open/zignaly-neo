import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { PercentageIndicatorSmall, PercentChangeContainer } from '../styles';
import { ZigTypography } from '@zignaly-open/ui';
import { Tooltip } from '@mui/material';
var PercentChange = function (_a) {
    var id = _a.id, value = _a.value, colored = _a.colored, _b = _a.variant, variant = _b === void 0 ? 'h6' : _b;
    var t = useTranslation('common').t;
    var color = colored
        ? +value < 0
            ? 'redGraphOrError'
            : 'greenGraph'
        : 'neutral200';
    var isFinite = Number.isFinite(+value || 0);
    var tooltipWrap = function (v) {
        return !isFinite ? (React.createElement(Tooltip, { title: t("infinitely-".concat(+value > 0 ? 'better' : 'worse')) }, v)) : (v);
    };
    return tooltipWrap(React.createElement(PercentChangeContainer, { component: 'div', color: color, id: id },
        React.createElement(ZigTypography, { variant: variant }, +value > 0 ? (React.createElement(ArrowDropUp, { sx: {
                color: function (theme) { return theme.palette[color]; },
                height: '0.75em',
                width: '0.75em',
            } })) : (React.createElement(ArrowDropDown, { sx: {
                color: function (theme) { return theme.palette[color]; },
                height: '0.75em',
                width: '0.75em',
                position: 'relative',
                top: '0.15em',
            } }))),
        +value > 0 ? '' : React.createElement(React.Fragment, null, "\u2013"),
        isFinite ? (t('common:number', { value: Math.abs(+value || 0) })) : (React.createElement(React.Fragment, null, '∞')),
        React.createElement(PercentageIndicatorSmall, { sx: {
                color: function (theme) { return theme.palette[color]; },
            } }, '%')));
};
export default PercentChange;
//# sourceMappingURL=PercentChange.js.map