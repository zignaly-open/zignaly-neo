import { Box } from '@mui/material';
import { ZigCoinIcon, ZigPriceLabel } from '@zignaly-open/ui';
import React from 'react';
export var ZigPriceLabelIcon = function (_a) {
    var amount = _a.amount, coin = _a.coin, iconBucket = _a.iconBucket, precision = _a.precision;
    return (React.createElement(Box, { display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' },
        React.createElement(ZigCoinIcon, { name: coin, coin: coin, bucket: iconBucket }),
        React.createElement(ZigPriceLabel, { noWrap: true, component: 'span', color: 'neutral100', variant: 'bigNumber', value: +amount, coin: coin, precision: precision, coinProps: {
                color: 'neutral400',
                variant: 'h3',
                component: 'span',
                fontWeight: 500,
            } })));
};
//# sourceMappingURL=ZigPriceLabelIcon.js.map