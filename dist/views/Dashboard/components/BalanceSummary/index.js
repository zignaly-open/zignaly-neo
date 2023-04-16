import React from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout } from './styles';
import { PencilIcon, TextButton, ZigTypography, ZigPriceLabel, } from '@zignaly-open/ui';
import { getColorForNumber } from '../../../../util/numbers';
import { Box } from '@mui/material';
export var BalanceSummary = function (_a) {
    var prefixId = _a.prefixId, serviceId = _a.serviceId, totalValue = _a.totalValue, profit = _a.profit, _b = _a.coin, coin = _b === void 0 ? 'USDT' : _b, _c = _a.dashboardType, dashboardType = _c === void 0 ? 'investor' : _c, _d = _a.onClickEdit, onClickEdit = _d === void 0 ? function () { return null; } : _d;
    var t = useTranslation(['table', 'action']).t;
    return (React.createElement(Layout, null,
        React.createElement(Box, null, dashboardType === 'marketplace' ? (React.createElement(ZigTypography, null, t('balanceSummary.invested'))) : (React.createElement(ZigPriceLabel, { id: prefixId && serviceId && "".concat(prefixId, "__invested-").concat(serviceId), value: new BigNumber(totalValue).toFixed(), coin: coin }))),
        React.createElement(Box, null, isNaN(+profit) || profit === '' ? (React.createElement(ZigTypography, { variant: 'body2', color: 'neutral400' }, "-")) : (React.createElement(ZigPriceLabel, { id: prefixId && serviceId && "".concat(prefixId, "__profit-").concat(serviceId), value: profit, coin: coin, color: getColorForNumber(profit) }))),
        React.createElement(TextButton, { id: "".concat(prefixId, "__edit-").concat(serviceId), leftElement: React.createElement(PencilIcon, { color: '#65647E', width: 16, height: 16 }), caption: t('action:edit'), color: 'links', onClick: onClickEdit })));
};
//# sourceMappingURL=index.js.map