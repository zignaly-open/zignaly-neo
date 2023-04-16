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
import React from 'react';
import DepositForm from '../forms/DepositForm';
import { useCoinBalances, useExchangeCoinsList, } from '../../../../../apis/coin/use';
import CenteredLoader from '../../../../../components/CenteredLoader';
import { useActivateExchange } from 'apis/user/use';
var DepositView = function (props) {
    var isFetchingBalances = useCoinBalances({ convert: true }).isFetching;
    var isFetchingCoins = useExchangeCoinsList().isFetching;
    var isActivating = useActivateExchange().isFetching;
    return isActivating || isFetchingCoins || isFetchingBalances ? (React.createElement(CenteredLoader, null)) : (React.createElement(DepositForm, __assign({}, props)));
};
export default DepositView;
//# sourceMappingURL=Deposit.js.map