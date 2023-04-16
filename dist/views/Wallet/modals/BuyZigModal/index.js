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
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from 'apis/user/use';
import CenteredLoader from 'components/CenteredLoader';
import { useBulkCoinsQuery } from 'apis/coin/api';
import AddUsdtForm from './AddUsdtForm';
import SwapZIGForm from './SwapForm';
import ZModal from 'components/ZModal';
function BuyZigModal(_a) {
    var coins = _a.coins, selectedCoin = _a.selectedCoin, close = _a.close, props = __rest(_a, ["coins", "selectedCoin", "close"]);
    var t = useTranslation('wallet').t;
    var exchanges = useCurrentUser().exchanges;
    var zignalyExchangeAccounts = exchanges === null || exchanges === void 0 ? void 0 : exchanges.filter(function (e) { return e.exchangeName.toLowerCase() === 'zignaly'; });
    var accountsCoins = useBulkCoinsQuery({
        exchangeAccounts: zignalyExchangeAccounts.map(function (a) { return a.internalId; }),
    }).data;
    var exchangeAccounts = useMemo(function () {
        return accountsCoins === null || accountsCoins === void 0 ? void 0 : accountsCoins.map(function (a) {
            var exchange = exchanges.find(function (e) { return e.internalId === a.exchangeInternalId; });
            return {
                exchange: exchange,
                balances: a.balances,
            };
        });
    }, [accountsCoins]);
    useEffect(function () {
        if (!accountsCoins)
            return;
        if (!accountsCoins.find(function (a) { var _a; return parseFloat((_a = a.balances.USDT) === null || _a === void 0 ? void 0 : _a.balanceFree) > 0; })) {
            setStep('deposit');
        }
        else {
            setStep('swap');
        }
    }, [accountsCoins]);
    var _b = useState(null), step = _b[0], setStep = _b[1];
    var PAGE_TITLE = {
        deposit: t('buy.deposit.title', { coin: 'USDT' }),
        confirm: t('buy.confirm'),
        swap: t('buy.title'),
    };
    return (React.createElement(ZModal, __assign({ wide: true }, props, { close: close, title: PAGE_TITLE[step] }), !exchangeAccounts ? (React.createElement(CenteredLoader, null)) : step === 'deposit' ? (React.createElement(AddUsdtForm, { accountBalances: exchangeAccounts, setStep: setStep, close: close })) : step === 'swap' || step === 'confirm' ? (React.createElement(SwapZIGForm, { coinFrom: 'USDT', coinTo: 'ZIG', accountsBalances: exchangeAccounts, onDepositMore: function () { return setStep('deposit'); }, setStep: setStep, onDone: close })) : null));
}
BuyZigModal.trackId = 'wallet-buy';
export default BuyZigModal;
//# sourceMappingURL=index.js.map