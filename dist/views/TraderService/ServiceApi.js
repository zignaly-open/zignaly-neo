import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import ApiKeyManagement from './components/ApiKeys/ApiKeyManagement';
var ServiceApi = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.api-trading', serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, null,
            React.createElement(ApiKeyManagement, null))));
};
export default ServiceApi;
//# sourceMappingURL=ServiceApi.js.map