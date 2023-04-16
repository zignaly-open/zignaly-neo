import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import { Navigate, useParams } from 'react-router-dom';
import { useServiceDetails, useTraderServiceTitle, } from '../../apis/service/use';
import EditServiceProfileContainer from './components/EditServiceProfileContainer';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { ErrorCodes } from 'util/errors';
import { ROUTE_404 } from 'routes';
import CriticalError from 'components/Stub/CriticalError';
var EditService = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.edit', serviceId);
    var serviceDetailsEndpoint = useServiceDetails(serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, { isOwner: true },
            React.createElement(LayoutContentWrapper, { endpoint: serviceDetailsEndpoint, unmountOnRefetch: true, error: function (error) {
                    var _a;
                    if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.error.code) === ErrorCodes.NoSuchService)
                        return React.createElement(Navigate, { to: ROUTE_404 });
                    return React.createElement(CriticalError, null);
                }, content: function (service) { return (React.createElement(EditServiceProfileContainer, { service: service })); } }))));
};
export default EditService;
//# sourceMappingURL=EditService.js.map