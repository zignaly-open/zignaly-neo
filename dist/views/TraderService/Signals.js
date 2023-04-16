import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';
import { useParams } from 'react-router-dom';
var Signals = function () {
    var serviceId = useParams().serviceId;
    useTraderServiceTitle('profit-sharing.signals', serviceId);
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, null),
        React.createElement(TraderServicePageContainer, null,
            React.createElement(ComingSoon, null))));
};
export default Signals;
//# sourceMappingURL=Signals.js.map