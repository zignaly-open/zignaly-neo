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
import React, { useEffect, useState } from 'react';
import { useCurrentBalance, useSelectedInvestment, useSelectInvestment, } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import useMaybeNavigateNotLoggedIn from '../../../../util/hooks/useMaybeNavigateNotLoggedIn';
import InvestModal from './InvestModal';
import ChooseDepositTypeModal from './ChooseDepositTypeModal';
import ZModal from '../../../../components/ZModal';
function InvestDepositModal(_a) {
    var serviceId = _a.serviceId, props = __rest(_a, ["serviceId"]);
    var _b = useServiceDetails(serviceId), isLoadingService = _b.isLoading, isFetching = _b.isFetching, service = _b.data;
    var _c = useCurrentBalance(service === null || service === void 0 ? void 0 : service.ssc), balance = _c.balance, isLoadingBalance = _c.isFetching;
    var selectedInvestment = useSelectedInvestment();
    var loading = isLoadingService || isLoadingBalance || isFetching || !selectedInvestment;
    var _d = useState(!loading), ready = _d[0], setReady = _d[1];
    useEffect(function () {
        setReady(function (r) { return !loading || r; });
    }, [loading]);
    useSelectInvestment(service);
    useMaybeNavigateNotLoggedIn();
    var showDeposit = +balance === 0;
    if (!ready) {
        return React.createElement(ZModal, __assign({ title: '', wide: true }, props, { close: close, isLoading: true }));
    }
    else if (showDeposit) {
        return React.createElement(ChooseDepositTypeModal, __assign({}, props, { selectedCoin: service === null || service === void 0 ? void 0 : service.ssc }));
    }
    else {
        return React.createElement(InvestModal, __assign({}, props));
    }
}
export default InvestDepositModal;
//# sourceMappingURL=IndestDepositModal.js.map