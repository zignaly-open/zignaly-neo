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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, ZigSelect, InputAmountAdvanced, Button, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { Box, Grid } from '@mui/material';
import { useCoinBalances, useExchangeCoinsList, } from '../../../../../../apis/coin/use';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawValidation } from './validations';
import CenteredLoader from 'components/CenteredLoader';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import LabelValueLine from './atoms/LabelValueLine';
import WithdrawConfirmForm from '../WithdrawConfirmForm';
import { useWithdrawMutation } from 'apis/coin/api';
import { useActiveExchange, useCheck2FA } from 'apis/user/use';
function WithdrawForm(_a) {
    var _this = this;
    var _b, _c, _d;
    var setStep = _a.setStep, selectedCoin = _a.selectedCoin, close = _a.close;
    var t = useTranslation('withdraw-crypto').t;
    var _e = useCoinBalances({
        convert: true,
    }), balances = _e.data, isLoadingBalances = _e.isLoading;
    var _f = useExchangeCoinsList(), coins = _f.data, isLoadingCoins = _f.isLoading;
    var _g = useState(), confirmationData = _g[0], setConfirmationData = _g[1];
    var internalId = useActiveExchange().internalId;
    var _h = useWithdrawMutation(), withdraw = _h[0], withdrawStatus = _h[1];
    var check2FA = useCheck2FA({
        status: withdrawStatus,
    });
    var handleWithdraw = function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            check2FA(function (code) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, withdraw({
                                asset: coin,
                                network: confirmationData.network,
                                exchangeInternalId: internalId,
                                address: confirmationData.address,
                                tag: confirmationData.tag,
                                amount: confirmationData.amount.value.toString(),
                                code: code,
                            }).unwrap()];
                        case 1:
                            _a.sent();
                            setStep('success');
                            return [2];
                    }
                });
            }); });
            return [2];
        });
    }); };
    var _j = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            address: '',
            tag: '',
        },
        resolver: function (data, context, options) {
            return yupResolver(WithdrawValidation(networkObject))(data, context, options);
        },
    }), handleSubmit = _j.handleSubmit, control = _j.control, watch = _j.watch, setValue = _j.setValue, getValues = _j.getValues, trigger = _j.trigger, _k = _j.formState, isValid = _k.isValid, errors = _k.errors;
    var coin = watch('coin');
    var network = watch('network');
    var coinOptions = useMemo(function () {
        if (!balances || !coins)
            return [];
        return Object.entries(balances)
            .filter(function (_a) {
            var c = _a[0], balance = _a[1];
            return (parseFloat(balance.balanceTotal) > 0 || c == selectedCoin) &&
                coins[c];
        })
            .map(function (_a) {
            var _b, _c;
            var c = _a[0], balance = _a[1];
            var name = ((_b = coins[c]) === null || _b === void 0 ? void 0 : _b.name) || '';
            return {
                value: c,
                name: name,
                label: React.createElement(CoinOption, { key: c, coin: c, name: name }),
                available: (balance === null || balance === void 0 ? void 0 : balance.maxWithdrawAmount) || 0,
                networks: (_c = coins[c].networks) === null || _c === void 0 ? void 0 : _c.map(function (n) { return (__assign({ label: n.name, value: n.network }, n)); }),
            };
        });
    }, [balances, coins]);
    var coinObject = coin && (coinOptions === null || coinOptions === void 0 ? void 0 : coinOptions.find(function (x) { return x.value === coin; }));
    var networkObject = network && ((_b = coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.value === network; }));
    useEffect(function () {
        if (coin) {
            setValue('network', coinObject.networks.length === 1 ? coinObject.networks[0].value : null, { shouldValidate: true });
        }
        else if ((coinOptions === null || coinOptions === void 0 ? void 0 : coinOptions.length) === 1) {
            setValue('coin', coinOptions[0].value);
        }
    }, [coin]);
    useEffect(function () {
        if (!coin && coinOptions && selectedCoin) {
            var match = coinOptions.find(function (x) { return x.value === selectedCoin; });
            match && setValue('coin', match === null || match === void 0 ? void 0 : match.value);
        }
    }, []);
    useEffect(function () {
        var _a = getValues(), amount = _a.amount, address = _a.address;
        if (amount && amount.value !== '') {
            trigger('amount');
        }
        if (address) {
            trigger('address');
        }
    }, [network]);
    var canSubmit = isValid && Object.keys(errors).length === 0;
    if (isLoadingCoins || isLoadingBalances) {
        return React.createElement(CenteredLoader, null);
    }
    if (confirmationData) {
        return (React.createElement(WithdrawConfirmForm, __assign({ action: handleWithdraw, status: withdrawStatus, back: function () {
                setConfirmationData(null);
                setStep('');
            } }, confirmationData, { amount: Number(confirmationData.amount.value), networkName: networkObject.name, networkCoin: networkObject.coin, coin: coin, fee: parseFloat(networkObject.withdrawFee), close: close })));
    }
    return (React.createElement("form", { onSubmit: handleSubmit(function (data) {
            setStep('confirm');
            setConfirmationData(data);
        }), autoComplete: 'off' },
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, null, t('description'))),
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Controller, { name: 'coin', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ id: 'withdraw__select-coin', menuPlacement: 'auto', menuShouldScrollIntoView: false, menuPosition: 'fixed', menuShouldBlockScroll: true, label: t('coinSelector.label'), placeholder: t('coinSelector.placeholder'), options: coinOptions, filterOption: filterOptions }, field)));
                    } })),
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Controller, { name: 'network', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ id: 'withdraw__select-network', menuPosition: 'fixed', menuShouldBlockScroll: true, menuShouldScrollIntoView: false, label: t('networkSelector.label'), placeholder: t('networkSelector.placeholder'), options: coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks }, field)));
                    } })),
            !!network && !(networkObject === null || networkObject === void 0 ? void 0 : networkObject.withdrawEnable) ? (React.createElement(Box, { mt: 2 },
                React.createElement(ErrorMessage, { text: networkObject === null || networkObject === void 0 ? void 0 : networkObject.withdrawDesc }))) : (React.createElement(React.Fragment, null,
                React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(Controller, { name: 'address', control: control, rules: { required: true }, render: function (_a) {
                            var _b;
                            var field = _a.field;
                            return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('withdrawAddress.label'), placeholder: t('withdrawAddress.placeholder'), error: t((_b = errors.address) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                        } })),
                (networkObject === null || networkObject === void 0 ? void 0 : networkObject.label) && (React.createElement(Box, null,
                    React.createElement(ErrorMessage, { text: t('withdrawAddress.warning', {
                            network: networkObject === null || networkObject === void 0 ? void 0 : networkObject.label,
                            coin: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name,
                        }) }))),
                !!(networkObject === null || networkObject === void 0 ? void 0 : networkObject.memoRegex) && (React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(Controller, { name: 'tag', control: control, rules: { required: true }, render: function (_a) {
                            var _b;
                            var field = _a.field;
                            return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('withdrawMemo.label'), placeholder: t('withdrawMemo.placeholder'), error: t((_b = errors.tag) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                        } }))),
                coinObject && (React.createElement(Grid, { item: true, xs: 12, mt: 3 },
                    React.createElement(InputAmountAdvanced, { name: 'amount', control: control, label: t('amountToWithdraw.label'), showUnit: true, showBalance: false, placeholder: '0.0', tokens: [
                            {
                                id: coin,
                                balance: coinObject.available,
                            },
                        ], error: t((_d = (_c = errors === null || errors === void 0 ? void 0 : errors.amount) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.message) }),
                    React.createElement(Box, { mt: 1 },
                        React.createElement(LabelValueLine, { label: t('amountToWithdraw.labelBalance'), value: coinObject.available.toString(), coin: coin })),
                    networkObject && (React.createElement(React.Fragment, null,
                        React.createElement(LabelValueLine, { label: t('amountToWithdraw.minimum'), value: networkObject.withdrawMin, coin: coin }),
                        React.createElement(LabelValueLine, { label: t('amountToWithdraw.fee'), value: networkObject.withdrawFee, coin: coin }))))),
                React.createElement(ModalActions, { align: 'right' },
                    React.createElement(Button, { id: 'withdraw__close', size: 'large', type: 'button', variant: 'secondary', caption: t('common:close'), onClick: close }),
                    React.createElement(Button, { id: 'withdraw__continue', size: 'large', type: 'submit', caption: t('confirmation.continue'), disabled: !canSubmit })))))));
}
export default WithdrawForm;
//# sourceMappingURL=index.js.map