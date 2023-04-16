import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import ChainIcon from 'components/ChainIcon';
export var filterOptions = function (option, input) {
    if (input) {
        var lowerInput = input.toLowerCase();
        return (option.value.toLowerCase().includes(lowerInput) ||
            option.data.name.toLowerCase().includes(lowerInput));
    }
    return true;
};
var ChainOption = function (_a) {
    var network = _a.network, name = _a.name;
    return (React.createElement(Box, { display: 'flex', alignItems: 'center', gap: '11px' },
        React.createElement(ChainIcon, { network: network }),
        React.createElement(ZigTypography, null, name)));
};
export default ChainOption;
//# sourceMappingURL=ChainOption.js.map