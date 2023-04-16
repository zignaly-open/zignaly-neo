import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ServiceProfileContainer from './components/ServiceProfileContainer';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import { useIsServiceOwner, useServiceDetails, useTraderServiceTitle, } from '../../apis/service/use';
import { useIsAuthenticated } from '../../apis/user/use';
import { ROUTE_404, ROUTE_LOGIN, ROUTE_PROFIT_SHARING } from '../../routes';
import { TraderServiceAccessLevel } from '../../apis/service/types';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { ErrorCodes } from '../../util/errors';
import CriticalError from '../../components/Stub/CriticalError';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import InvestDepositModal from '../Dashboard/components/ManageInvestmentModals/IndestDepositModal';
var ServiceProfile = function () {
    var serviceId = useParams().serviceId;
    var location = useLocation();
    useTraderServiceTitle('profit-sharing.service', serviceId);
    var serviceDetailsEndpoint = useServiceDetails(serviceId);
    var isAuthenticated = useIsAuthenticated();
    var isOwner = useIsServiceOwner(serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, { isOwner: isOwner },
            React.createElement(LayoutContentWrapper, { endpoint: serviceDetailsEndpoint, error: function (error) {
                    var _a, _b, _c;
                    if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.error.code) === ErrorCodes.SoloService)
                        return React.createElement(Navigate, { to: ROUTE_PROFIT_SHARING });
                    if (((_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.error.code) === ErrorCodes.NoSuchService)
                        return React.createElement(Navigate, { to: ROUTE_404 });
                    if (!isAuthenticated &&
                        ((_c = error === null || error === void 0 ? void 0 : error.data) === null || _c === void 0 ? void 0 : _c.error.code) === ErrorCodes.PrivateService) {
                        return (React.createElement(Navigate, { to: ROUTE_LOGIN, state: {
                                redirectTo: location,
                            } }));
                    }
                    return React.createElement(CriticalError, null);
                }, content: function (service) {
                    if (!isAuthenticated) {
                        if ([
                            TraderServiceAccessLevel.Solo,
                            TraderServiceAccessLevel.Private,
                        ].includes(service === null || service === void 0 ? void 0 : service.level)) {
                            return (React.createElement(Navigate, { to: ROUTE_LOGIN, state: {
                                    redirectTo: location,
                                } }));
                        }
                    }
                    return React.createElement(ServiceProfileContainer, { service: service });
                } }))));
};
export default ServiceProfile;
export var ServiceProfileInvestment = createZModalRouteElement({
    component: InvestDepositModal,
    options: {
        disableAutoDestroy: true,
    },
    ctaId: 'service-profile-invest-modal',
});
//# sourceMappingURL=ServiceProfile.js.map