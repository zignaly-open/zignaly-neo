import React from 'react';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { useIsServiceOwner } from '../../../../apis/service/use';
import { Box, Grid, useMediaQuery } from '@mui/material';
import theme from '../../../../theme';
import RightSideActions from './atoms/RightSideActions';
import ServiceGrowthChart from './atoms/ServiceGrowthChart';
import ServiceDescription from './atoms/ServiceDescription';
import ServiceManagerDescription from './atoms/ServiceManagerDescription';
import ServiceSummary from './atoms/ServiceSummary';
var ServiceProfileContainer = function (_a) {
    var service = _a.service;
    useCoinBalances();
    var isOwner = useIsServiceOwner(service.id);
    var md = useMediaQuery(theme.breakpoints.up('sm'));
    return (React.createElement(Box, { sx: {
            p: 2,
            pt: 0,
            pl: md ? 6 : 2,
            pr: md ? 6 : 2,
        }, paddingTop: isOwner ? 7 : 0 },
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, sx: { display: 'flex' }, xs: 12, md: 8, pb: 2, pr: 7.5 },
                React.createElement(ServiceProfileHeader, { service: service })),
            React.createElement(Grid, { item: true, xs: 12, md: 4, pb: 2 },
                React.createElement(RightSideActions, { service: service })),
            React.createElement(Grid, { item: true, xs: 12, md: 8, pr: 7.5 },
                React.createElement(ServiceGrowthChart, { service: service }),
                React.createElement(ServiceDescription, { service: service }),
                React.createElement(ServiceManagerDescription, { service: service })),
            React.createElement(Grid, { item: true, xs: 12, md: 4 },
                React.createElement(ServiceSummary, { service: service })))));
};
export default ServiceProfileContainer;
//# sourceMappingURL=index.js.map