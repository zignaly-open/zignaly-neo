import { Box } from '@mui/system';
import LiquidatedLabel from './LiquidatedLabel';
import InvestedButton from './InvestedButton';
import InvestButton from './InvestButton';
import React from 'react';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { RightSideActionWrapper } from '../styles';
import { Loader } from '@zignaly-open/ui';
import { ROUTE_PROFIT_SHARING_SERVICE_INVEST } from '../../../../../routes';
var RightSideActions = function (_a) {
    var service = _a.service;
    var isAuthenticated = useIsAuthenticated();
    var isInvested = useIsInvestedInService(service.id);
    var md = useMediaQuery(theme.breakpoints.up('sm'));
    return (React.createElement(RightSideActionWrapper, null,
        service.liquidated && (React.createElement(Box, { sx: { mt: -0.5 } },
            React.createElement(LiquidatedLabel, null))),
        !isInvested.isLoading && !service.liquidated && (React.createElement(Box, { sx: { mt: md ? 0 : 3 } }, isAuthenticated && isInvested.thisAccount ? (React.createElement(InvestedButton, { prefixId: 'service-profile', service: service, ctaId: 'service-profile-invested-button' })) : (React.createElement(InvestButton, { modalRoute: ROUTE_PROFIT_SHARING_SERVICE_INVEST, prefixId: 'service-profile', showMultipleAccountButton: true, service: service, ctaId: 'service-profile-invest-button' })))),
        isInvested.isLoading && !service.liquidated && (React.createElement(Loader, { color: '#fff', width: '40px', height: '40px', ariaLabel: '' }))));
};
export default RightSideActions;
//# sourceMappingURL=RightSideActions.js.map