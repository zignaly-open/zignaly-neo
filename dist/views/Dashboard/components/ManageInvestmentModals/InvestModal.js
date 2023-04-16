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
import { useSelectedInvestment } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
import InvestView from './views/Invest';
function InvestModal(_a) {
    var close = _a.close, props = __rest(_a, ["close"]);
    var service = useSelectedInvestment();
    var isLoadingService = useServiceDetails(service === null || service === void 0 ? void 0 : service.serviceId).isLoading;
    var isLoadingCoins = useCoinBalances().isLoading;
    var t = useTranslation(['edit-investment', 'withdraw-your-investment']).t;
    var isLoading = isLoadingService || isLoadingCoins;
    var _b = useState(false), isInvested = _b[0], setIsInvested = _b[1];
    return (React.createElement(ZModal, __assign({ wide: true }, props, { close: close, title: t(isInvested ? 'modalSuccess.title' : 'invest-modal.invest-with'), isLoading: isLoading }), !isLoading && (React.createElement(InvestView, { close: close, isInvested: isInvested, setIsInvested: setIsInvested }))));
}
InvestModal.trackId = 'invest';
export default InvestModal;
//# sourceMappingURL=InvestModal.js.map