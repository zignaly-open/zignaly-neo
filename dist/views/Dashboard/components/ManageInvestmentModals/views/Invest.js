import React from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';
var Invest = function (_a) {
    var close = _a.close, isInvested = _a.isInvested, setIsInvested = _a.setIsInvested;
    return isInvested ? (React.createElement(EditInvestmentSuccess, { close: close })) : (React.createElement(React.Fragment, null,
        React.createElement(InvestorDetails, null),
        React.createElement(InvestForm, { close: close, onInvested: function () { return setIsInvested(true); } })));
};
export default Invest;
//# sourceMappingURL=Invest.js.map