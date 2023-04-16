import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import ServiceManagementsContainer from './components/ServiceManagementsContainer';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';
var Management = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.management', serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, null,
            React.createElement(ServiceManagementsContainer, { serviceId: serviceId }))));
};
export default Management;
//# sourceMappingURL=Management.js.map