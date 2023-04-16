import React from 'react';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import PercentChange from './PercentChange';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getColorForNumber } from '../../../../../util/numbers';
var ServicePercentageInfo = function (_a) {
    var title = _a.title, value = _a.value, ssc = _a.ssc, percent = _a.percent, canShow = _a.canShow, id = _a.id;
    var t = useTranslation('service').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(ZigTypography, { color: 'neutral300' }, title),
        canShow ? (React.createElement(React.Fragment, null,
            React.createElement(ZigPriceLabel, { id: id, sx: { mb: 1 }, component: 'div', shorten: true, variant: 'h1', color: getColorForNumber(value), value: +value, coin: ssc }),
            React.createElement(PercentChange, { value: percent, id: id && "".concat(id, "-pct") }))) : (React.createElement(Box, { sx: {
                minHeight: 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement(Tooltip, { title: t('not-enough-time') },
                React.createElement(ZigTypography, { variant: 'h1', component: 'div', color: 'neutral400' }, "\u2014"))))));
};
export default ServicePercentageInfo;
//# sourceMappingURL=ServicePercentageInfo.js.map