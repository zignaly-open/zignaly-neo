var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditInvestmentViews } from './types';
import EditInvestment from './views/EditInvestment';
import WithdrawInvestment from './views/WithdrawInvestment';
import PendingTransactionsList from './views/PendingTransactionsList';
import { useInvestmentDetails, useSelectedInvestment, useSelectInvestment, } from '../../../../apis/investment/use';
import WithdrawWithdrawInvestmentSuccessPerform from './views/WithdrawInvestmentPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawInvestmentSuccess';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
function EditInvestmentModal(_a) {
    var _b;
    var close = _a.close, serviceId = _a.serviceId, props = __rest(_a, ["close", "serviceId"]);
    var isLoadingInvestment = useInvestmentDetails(serviceId).isLoading;
    var _c = useServiceDetails(serviceId), isLoadingService = _c.isLoading, service = _c.data;
    useSelectInvestment(service);
    var selectedInvestment = useSelectedInvestment();
    var isLoadingCoins = useCoinBalances().isLoading;
    var _d = useState(EditInvestmentViews.EditInvestment), view = _d[0], setView = _d[1];
    var t = useTranslation(['edit-investment', 'withdraw-your-investment']).t;
    var views = (_b = {},
        _b[EditInvestmentViews.WithdrawInvestment] = {
            title: t('withdraw-your-investment:title'),
            component: function () { return React.createElement(WithdrawInvestment, { setView: setView }); },
        },
        _b[EditInvestmentViews.WithdrawSuccess] = {
            title: t('withdraw-your-investment:success.title'),
            component: function () { return React.createElement(WithdrawModalSuccess, { close: close }); },
        },
        _b[EditInvestmentViews.WithdrawPerform] = {
            title: t('withdraw-your-investment:title'),
            component: function () { return (React.createElement(WithdrawWithdrawInvestmentSuccessPerform, { setView: setView })); },
        },
        _b[EditInvestmentViews.PendingTransactions] = {
            title: t('modal.pendingTransaction.title'),
            component: function () { return React.createElement(PendingTransactionsList, { setView: setView }); },
        },
        _b[EditInvestmentViews.EditInvestment] = {
            title: t('modal.editInvestments.title'),
            component: function () { return React.createElement(EditInvestment, { setView: setView, close: close }); },
        },
        _b[EditInvestmentViews.EditInvestmentSuccess] = {
            title: t('modalSuccess.title'),
            component: function () { return React.createElement(EditInvestmentSuccess, { close: close }); },
        },
        _b);
    var _e = views[view in views ? view : EditInvestmentViews.EditInvestment], title = _e.title, component = _e.component;
    var isLoading = isLoadingInvestment ||
        isLoadingService ||
        isLoadingCoins ||
        !selectedInvestment;
    return (React.createElement(ZModal, __assign({ wide: true }, props, { close: close, title: title, onGoBack: ![
            EditInvestmentViews.EditInvestment,
            EditInvestmentViews.EditInvestmentSuccess,
            EditInvestmentViews.WithdrawSuccess,
        ].includes(view)
            ? function () { return setView(EditInvestmentViews.EditInvestment); }
            : undefined, isLoading: isLoading }), !isLoading && component()));
}
EditInvestmentModal.trackId = 'edit-investment';
export default EditInvestmentModal;
//# sourceMappingURL=EditInvestmentModal.js.map