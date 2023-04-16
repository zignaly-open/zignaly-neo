import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
var Positions = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.positions', serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, null,
            React.createElement(ComingSoon, null))));
};
export default Positions;
//# sourceMappingURL=Positions.js.map