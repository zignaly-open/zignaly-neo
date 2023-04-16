import React from 'react';
import { Box } from '@mui/material';
import { useActiveExchange, useIsAuthenticated, } from '../../../../apis/user/use';
import { useInvestments } from '../../../../apis/investment/use';
import InvestButton from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestButton';
import { InvestedButtonBase } from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestedButton';
import { marketplaceServiceToServiceType } from '../../../../apis/marketplace/util';
import CenteredLoader from '../../../../components/CenteredLoader';
import { LoaderWrapper } from './styles';
import BigNumber from 'bignumber.js';
var MarketplaceAction = function (_a) {
    var service = _a.service, _b = _a.prefixId, prefixId = _b === void 0 ? 'marketplace-table' : _b;
    var exchange = useActiveExchange();
    var isAuthenticated = useIsAuthenticated();
    var _c = useInvestments(exchange === null || exchange === void 0 ? void 0 : exchange.internalId, {
        skip: !(exchange === null || exchange === void 0 ? void 0 : exchange.internalId),
    }), isLoading = _c.isLoading, investments = _c.data;
    var traderService = marketplaceServiceToServiceType(service);
    var investment = investments === null || investments === void 0 ? void 0 : investments.find(function (x) { return x.serviceId === service.id; });
    var investedAmount = investment
        ? new BigNumber(investment.invested).plus(investment.pending)
        : 0;
    return (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'flex-end' } },
        React.createElement(Box, { sx: { minWidth: 195 } }, isLoading ? (React.createElement(LoaderWrapper, null,
            React.createElement(CenteredLoader, { width: 195, height: 40 }))) : (React.createElement(React.Fragment, null, isAuthenticated && investedAmount ? (React.createElement(InvestedButtonBase, { prefixId: prefixId, ctaId: 'marketplace-invested-button', service: traderService, investedAmount: investedAmount.toString() })) : (React.createElement(InvestButton, { prefixId: prefixId, service: traderService, ctaId: 'marketplace-invest-button' })))))));
};
export default MarketplaceAction;
//# sourceMappingURL=index.js.map