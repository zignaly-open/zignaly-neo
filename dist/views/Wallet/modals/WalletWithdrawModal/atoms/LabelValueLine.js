import { Box } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
var LabelValueLine = function (_a) {
    var label = _a.label, value = _a.value, coin = _a.coin;
    return (React.createElement(Box, { gap: 1, display: 'flex' },
        React.createElement(ZigTypography, { variant: 'body2', color: 'neutral200', fontWeight: 500 }, label),
        React.createElement(ZigPriceLabel, { value: value, variant: 'body2', color: 'neutral000', precision: 8, fontWeight: 500, coin: coin, coinProps: {
                color: 'neutral000',
                fontWeight: 500,
            } })));
};
export default LabelValueLine;
//# sourceMappingURL=LabelValueLine.js.map