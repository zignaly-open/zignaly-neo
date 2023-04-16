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
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, CircularProgress, Grid } from '@mui/material';
import { InputAmountAdvanced, ZigButton, ZignalyExchangeIcon, ZigPriceLabel, ZigSelect, ZigTypography, } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { useGenerateBuyPriceQuery } from 'apis/wallet/api';
import { track } from '@zignaly-open/tracker';
import { SwapValidation } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { differenceInMinutes, fromUnixTime } from 'date-fns';
import { useUpdateEffect } from 'react-use';
import SwapConfirmForm from './SwapConfirmForm';
import ExchangesTooltip from './atoms/ExchangesTooltip';
var SwapForm = function (_a) {
    var _b, _c, _d;
    var _e = _a.coinFrom, coinFrom = _e === void 0 ? 'USDT' : _e, _f = _a.coinTo, coinTo = _f === void 0 ? 'ZIG' : _f, accountsBalances = _a.accountsBalances, onDepositMore = _a.onDepositMore, onDone = _a.onDone, setStep = _a.setStep;
    var t = useTranslation('wallet').t;
    var _g = useState(null), confirm = _g[0], setConfirm = _g[1];
    var _h = useForm({
        mode: 'onChange',
        resolver: function (data, context, options) {
            return yupResolver(SwapValidation(Number(priceInfo === null || priceInfo === void 0 ? void 0 : priceInfo.minAmount), Number(priceInfo === null || priceInfo === void 0 ? void 0 : priceInfo.maxAmount), coinFrom, timeForMaxDiff))(data, context, options);
        },
        defaultValues: {
            exchangeAccount: (_b = accountsBalances[0]) === null || _b === void 0 ? void 0 : _b.exchange.internalId,
        },
    }), control = _h.control, _j = _h.formState, isValid = _j.isValid, errors = _j.errors, handleSubmit = _h.handleSubmit, watch = _h.watch, trigger = _h.trigger;
    var exchangeOptions = accountsBalances.map(function (a) { return ({
        value: a.exchange.internalId,
        label: (React.createElement(Box, { display: 'flex', alignItems: 'center', gap: 1 },
            React.createElement(ZignalyExchangeIcon, { width: 40, height: 40 }),
            React.createElement(ZigTypography, null, a.exchange.internalName))),
    }); });
    var selectedExchangeId = watch('exchangeAccount');
    var selectedExchangeObject = selectedExchangeId &&
        (accountsBalances === null || accountsBalances === void 0 ? void 0 : accountsBalances.find(function (a) { return a.exchange.internalId === selectedExchangeId; }));
    var amountFrom = watch('amount');
    var priceInfo = useGenerateBuyPriceQuery({
        from: coinFrom,
        to: coinTo,
    }, { pollingInterval: 20000 }).data;
    var timeForMaxDiff = priceInfo
        ? Math.ceil(differenceInMinutes(fromUnixTime(priceInfo.timeForMax), new Date()))
        : 0;
    var amountTo = priceInfo && amountFrom ? +amountFrom.value * +priceInfo.price : null;
    useUpdateEffect(function () {
        if (!isValid && amountFrom.value) {
            trigger('amount');
        }
    }, [priceInfo]);
    var submitForm = function (data) {
        setConfirm(data);
        setStep('confirm');
    };
    if (confirm) {
        return (React.createElement(SwapConfirmForm, { internalId: confirm.exchangeAccount, coinFrom: coinFrom, coinTo: coinTo, amount: confirm.amount.value.toString(), onCancel: function () {
                setConfirm(null);
                setStep('swap');
            }, onDone: onDone }));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { my: 1 },
            React.createElement(ZigTypography, null,
                React.createElement(Trans, { i18nKey: 'buy.description', t: t, values: {
                        coin: 'USDT',
                        max: '5,000',
                    } },
                    React.createElement(ExchangesTooltip, null)))),
        React.createElement("form", { onSubmit: handleSubmit(submitForm) },
            React.createElement(Grid, { container: true, flexDirection: 'column' },
                React.createElement(Grid, { item: true, pt: 3 },
                    React.createElement(Controller, { name: 'exchangeAccount', control: control, rules: { required: true }, render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(ZigSelect, __assign({ menuPlacement: 'auto', menuShouldScrollIntoView: false, menuPosition: 'fixed', menuShouldBlockScroll: true, label: t('buy.exchangeAccount'), placeholder: '', options: exchangeOptions }, field, { onChange: function (value) {
                                    field.onChange(value);
                                    track({ ctaId: 'select-account-zig' });
                                } })));
                        } })),
                selectedExchangeId && (React.createElement(React.Fragment, null,
                    React.createElement(Grid, { item: true, pt: 3 },
                        React.createElement(InputAmountAdvanced, { name: 'amount', control: control, label: t('buy.swapFrom'), showUnit: true, placeholder: '0.0', tokens: [
                                {
                                    id: coinFrom,
                                    balance: selectedExchangeObject.balances[coinFrom].balanceFree,
                                },
                            ], error: t((_d = (_c = errors === null || errors === void 0 ? void 0 : errors.amount) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.message) })),
                    React.createElement(Grid, { item: true, pt: 3, display: 'flex', flexDirection: 'column' },
                        React.createElement(ZigTypography, null, t('buy.swapTo')),
                        (priceInfo === null || priceInfo === void 0 ? void 0 : priceInfo.price) || !(amountFrom === null || amountFrom === void 0 ? void 0 : amountFrom.value) ? (React.createElement(ZigPriceLabel, { variant: 'h2', precision: 2, value: amountTo, coin: 'ZIG' })) : (React.createElement(CircularProgress, { size: 12, sx: { m: 1 } }))),
                    React.createElement(Grid, { item: true, display: 'flex', flexDirection: 'column', mt: '64px', alignItems: 'center', gap: 1 },
                        React.createElement(ZigButton, { id: 'buy-zig__continue', type: 'submit', disabled: !isValid || !amountTo, variant: 'contained' }, t('buy.continue')),
                        React.createElement(ZigButton, { id: 'buy-zig__deposit-more', onClick: onDepositMore, variant: 'text' }, t('buy.deposit.more', { coin: coinFrom })))))))));
};
export default SwapForm;
//# sourceMappingURL=SwapForm.js.map