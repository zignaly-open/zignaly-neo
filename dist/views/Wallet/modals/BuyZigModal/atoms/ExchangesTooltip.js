import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ASCENDEX_URL, GATEIO_URL, MEXC_URL } from 'util/constants';
import { Box, Link, Tooltip } from '@mui/material';
var ExchangesTooltipContent = function () {
    var t = useTranslation('wallet').t;
    return (React.createElement(Box, { p: 1, display: 'flex', flexDirection: 'column' },
        t('buy.buy-exchanges'),
        React.createElement(Link, { href: ASCENDEX_URL, rel: 'noreferrer', target: '_blank' }, "AscendEX >"),
        React.createElement(Link, { href: MEXC_URL, rel: 'noreferrer', target: '_blank' }, "MEXC >"),
        React.createElement(Link, { href: GATEIO_URL, rel: 'noreferrer', target: '_blank' }, "Gate.io >")));
};
var ExchangesTooltip = function () {
    var t = useTranslation('wallet').t;
    return (React.createElement(Tooltip, { placement: 'bottom', title: React.createElement(ExchangesTooltipContent, null) },
        React.createElement(ZigTypography, { color: 'links', style: { cursor: 'pointer' } }, t('buy.available-exchanges'))));
};
export default ExchangesTooltip;
//# sourceMappingURL=ExchangesTooltip.js.map