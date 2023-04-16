import ServiceInvestorsContainer from 'views/TraderService/components/InvestorTable';
import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';
var Investors = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.investors', serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, null,
            React.createElement(ServiceInvestorsContainer, { serviceId: serviceId }))));
};
export default Investors;
//# sourceMappingURL=Investors.js.map