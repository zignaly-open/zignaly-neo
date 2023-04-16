import { Box, Collapse, Grid } from '@mui/material';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../ServiceCard';
var TopServicesCards = function (_a) {
    var services = _a.services;
    var t = useTranslation(['marketplace', 'action']).t;
    var _b = useState(true), show = _b[0], setShow = _b[1];
    return (React.createElement(Box, null,
        React.createElement(Box, { display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 },
            React.createElement(ZigTypography, { variant: 'subtitle2', color: 'neutral400' }, t('card.top-rated')),
            React.createElement(TextButton, { color: 'links', onClick: function () { return setShow(!show); }, caption: t(show ? 'action:hide' : 'action:show') })),
        React.createElement(Collapse, { in: show },
            React.createElement(Grid, { container: true, columnSpacing: '68px', rowSpacing: 3, justifyContent: 'space-around', mb: 5.5 }, services.map(function (s) { return (React.createElement(Grid, { item: true, key: s.id },
                React.createElement(ServiceCard, { service: s }))); })))));
};
export default TopServicesCards;
//# sourceMappingURL=index.js.map