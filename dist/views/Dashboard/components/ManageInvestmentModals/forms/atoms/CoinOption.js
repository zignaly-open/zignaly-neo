import React from 'react';
import { Box } from '@mui/material';
import { ZigCoinIcon, ZigTypography } from '@zignaly-open/ui';
export var filterOptions = function (option, input) {
    if (input) {
        var lowerInput = input.toLowerCase();
        return (option.value.toLowerCase().includes(lowerInput) ||
            option.data.name.toLowerCase().includes(lowerInput));
    }
    return true;
};
var CoinOption = function (_a) {
    var coin = _a.coin, name = _a.name;
    return (React.createElement(Box, { display: 'flex', alignItems: 'center' },
        React.createElement(Box, { mr: '11px' },
            React.createElement(ZigCoinIcon, { size: 'small', coin: coin, name: name })),
        React.createElement(ZigTypography, { fontWeight: 600 }, coin),
        "\u00A0",
        React.createElement(ZigTypography, null, name)));
};
export default CoinOption;
//# sourceMappingURL=CoinOption.js.map