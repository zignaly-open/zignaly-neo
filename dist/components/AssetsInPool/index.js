import React from 'react';
import { BlockTypography, Icon, PriceBoxOverride } from './styles';
import { WhaleIcon, ZigPriceLabel } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatLocalizedDistance } from 'views/Dashboard/components/MyDashboard/util';
var AssetsInPool = function (_a) {
    var prefixId = _a.prefixId, serviceId = _a.serviceId, assetsValue = _a.assetsValue, numberOfInvestors = _a.numberOfInvestors, convertedValue = _a.convertedValue, convertedValueCoin = _a.convertedValueCoin, createdAt = _a.createdAt, _b = _a.shorten, shorten = _b === void 0 ? false : _b;
    var t = useTranslation('marketplace').t;
    return (React.createElement(Box, { justifyContent: 'center', sx: { gap: 2 } },
        React.createElement(PriceBoxOverride, { id: prefixId && "".concat(prefixId, "__invested-").concat(serviceId), sx: {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
            } },
            React.createElement(ZigPriceLabel, { usd: true, value: assetsValue, variant: 'h2', component: 'div', color: 'neutral200', shorten: shorten }),
            +assetsValue >= 200000 && (React.createElement(Icon, null,
                React.createElement(WhaleIcon, null)))),
        typeof numberOfInvestors === 'number' && (React.createElement(Box, { justifyContent: 'center', alignItems: 'start', id: prefixId && "".concat(prefixId, "__investors-").concat(serviceId) },
            React.createElement(BlockTypography, { variant: 'h5', color: 'neutral400' }, t('table.x-investors', { count: numberOfInvestors })))),
        createdAt && (React.createElement(Box, { justifyContent: 'center', alignItems: 'start', id: prefixId && "".concat(prefixId, "__created-at") },
            React.createElement(BlockTypography, { variant: 'h5', color: 'neutral400' }, formatLocalizedDistance(new Date(), new Date(createdAt))))),
        typeof convertedValue === 'number' && (React.createElement(Box, { justifyContent: 'center', alignItems: 'start', id: prefixId && "".concat(prefixId, "__converted-").concat(serviceId) },
            React.createElement(ZigPriceLabel, { value: convertedValue, coin: convertedValueCoin, color: 'neutral300', coinProps: { color: 'neutral300' } })))));
};
export default AssetsInPool;
//# sourceMappingURL=index.js.map