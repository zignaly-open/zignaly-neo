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
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumericFormat } from 'react-number-format';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Actions, Body, ToContainer, ToOutline, TypographyBalance, Inline, TypographyNumberResult, } from './styles';
import { Typography, SwapVertIcon, Button, InputAmountAdvanced, IconButton, } from '@zignaly-open/ui';
import { TransferModalValidation } from './validation';
import { Box } from '@mui/system';
import { useTraderServiceBalance, useServiceDetails, useTraderServiceTransferFunds, } from '../../../../apis/service/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from 'components/ZModal';
function TransferModal(_a) {
    var _b, _c, _d, _e, _f, _g;
    var serviceId = _a.serviceId, close = _a.close, props = __rest(_a, ["serviceId", "close"]);
    var t = useTranslation('management').t;
    var balance = useTraderServiceBalance(serviceId).data;
    var service = useServiceDetails(serviceId).data;
    var _h = useState(true), fromTradingAccount = _h[0], setFromTradingAccount = _h[1];
    var toast = useToast();
    var _j = useTraderServiceTransferFunds(serviceId), transfer = _j[0], isTransferring = _j[1].isLoading;
    var freeBalance = new BigNumber((balance === null || balance === void 0 ? void 0 : balance.staSscFree) || 0).toFixed();
    var disconnectBalance = new BigNumber((balance === null || balance === void 0 ? void 0 : balance.scaSscSum) || 0).toFixed();
    var balanceFrom = fromTradingAccount ? freeBalance : disconnectBalance;
    var balanceTo = !fromTradingAccount ? freeBalance : disconnectBalance;
    var _k = useForm({
        mode: 'onChange',
        resolver: yupResolver(TransferModalValidation),
    }), watch = _k.watch, handleSubmit = _k.handleSubmit, control = _k.control, trigger = _k.trigger, setValue = _k.setValue, _l = _k.formState, isValid = _l.isValid, errors = _l.errors, isDirty = _l.isDirty;
    var amountTransferValue = (_b = watch('amountValue')) === null || _b === void 0 ? void 0 : _b.value;
    var toggleDestination = function () {
        var _a = watch('amountValue'), value = _a.value, token = _a.token;
        setValue('amountValue', {
            value: value,
            token: __assign(__assign({}, token), { balance: balanceTo }),
        });
        trigger('amountValue');
        setFromTradingAccount(function (v) { return !v; });
    };
    var onSubmit = useCallback(function (_a) {
        var _b;
        var amountValue = _a.amountValue;
        transfer({
            amount: (_b = amountValue === null || amountValue === void 0 ? void 0 : amountValue.value) === null || _b === void 0 ? void 0 : _b.toString(),
            from: fromTradingAccount ? 'STA' : 'SCA',
            to: fromTradingAccount ? 'SCA' : 'STA',
        }).then(function () {
            toast.success(t('management:transfer.success', {
                amount: "".concat(new BigNumber(amountValue === null || amountValue === void 0 ? void 0 : amountValue.value).toFixed(), " ").concat(amountValue === null || amountValue === void 0 ? void 0 : amountValue.token.id),
            }));
            close();
        });
    }, [serviceId, fromTradingAccount]);
    return (React.createElement(ZModal, __assign({ wide: true }, props, { authOnly: true, close: close, title: t('transferFunds.title'), isLoading: !balance || isTransferring }),
        React.createElement(Box, { sx: { marginBottom: 3 } },
            React.createElement(Typography, null, t('transferFunds.description'))),
        balance && !isTransferring && (React.createElement("form", { noValidate: true, onSubmit: handleSubmit(onSubmit) },
            React.createElement(Body, null,
                React.createElement(InputAmountAdvanced, { control: control, placeholder: t('transfer.placeholder'), fullWidth: true, maxLength: 26, error: isDirty && t((_d = (_c = errors === null || errors === void 0 ? void 0 : errors.amountValue) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.message), name: 'amountValue', label: t(fromTradingAccount
                        ? 'transfer.fromTradingAccount'
                        : 'transfer.fromStandbyAccount'), labelBalance: t('transfer.labelBalance'), tokens: [
                        {
                            id: (_e = service === null || service === void 0 ? void 0 : service.ssc) !== null && _e !== void 0 ? _e : 'USDT',
                            balance: balanceFrom,
                        },
                    ], showUnit: true }),
                React.createElement(IconButton, { id: 'transfer__swap-zig', size: 'xlarge', icon: React.createElement(SwapVertIcon, { color: '#65647E' }), variant: 'secondary', onClick: toggleDestination, type: 'button' }),
                React.createElement(ToContainer, null,
                    React.createElement(ToOutline, null,
                        React.createElement(Typography, { variant: 'h2' }, t("transfer.".concat(fromTradingAccount
                            ? 'toStandbyAccount'
                            : 'toTradingAccount'))),
                        React.createElement(Inline, null,
                            React.createElement(TypographyNumberResult, { variant: 'bigNumber', color: 'neutral100' },
                                amountTransferValue
                                    ? new BigNumber(amountTransferValue).toString()
                                    : '--',
                                ' '),
                            React.createElement(Typography, { variant: 'h3', color: 'neutral400' }, (_f = service === null || service === void 0 ? void 0 : service.ssc) !== null && _f !== void 0 ? _f : 'USDT'))),
                    React.createElement(Typography, { variant: 'body2', color: 'neutral200' },
                        t('transfer.deposit-available'),
                        React.createElement(TypographyBalance, { variant: 'body2', color: 'neutral000' },
                            React.createElement(NumericFormat, { value: balanceTo, displayType: 'text', suffix: " ".concat((_g = service === null || service === void 0 ? void 0 : service.ssc) !== null && _g !== void 0 ? _g : 'USDT'), thousandSeparator: true }))))),
            React.createElement(Actions, null,
                React.createElement(Button, { id: 'transfer__transfer-now', caption: t('transfer.now'), disabled: !isValid, size: 'xlarge', type: 'submit' }))))));
}
export default TransferModal;
//# sourceMappingURL=index.js.map