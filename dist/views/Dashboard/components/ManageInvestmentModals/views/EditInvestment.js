import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';
var EditInvestment = function (_a) {
    var setView = _a.setView, close = _a.close;
    return (React.createElement(React.Fragment, null,
        React.createElement(InvestorDetails, null),
        React.createElement(PendingTransactions, { setView: setView }),
        React.createElement(EditInvestmentForm, { close: close, setView: setView, onClickWithdrawInvestment: function () {
                return setView(EditInvestmentViews.WithdrawInvestment);
            } })));
};
export default EditInvestment;
//# sourceMappingURL=EditInvestment.js.map