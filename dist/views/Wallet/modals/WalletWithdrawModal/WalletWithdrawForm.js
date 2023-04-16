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
import { ErrorMessage, ZigSelect, InputAmountAdvanced, Button, ZigInput, ZigTypography, ZigCoinIcon, } from '@zignaly-open/ui';
import { Box, Grid, Link } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawValidation } from './validations';
import CenteredLoader from 'components/CenteredLoader';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import LabelValueLine from './atoms/LabelValueLine';
import { useBalanceQuery, useGenerateWithdrawFeeQuery, useWithdrawMutation, } from 'apis/wallet/api';
import WithdrawConfirmForm from 'views/Dashboard/components/ManageInvestmentModals/forms/WithdrawConfirmForm';
import { useCheck2FA } from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../WalletDepositModal';
function WalletWithdrawForm(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g;
    var setStep = _a.setStep, selectedCoin = _a.selectedCoin, close = _a.close, coins = _a.coins;
    var t = useTranslation('withdraw-crypto').t;
    var _h = useState(), confirmationData = _h[0], setConfirmationData = _h[1];
    var _j = useBalanceQuery(), balances = _j.data, isLoadingBalances = _j.isLoading;
    var showModal = useZModal().showModal;
    var _k = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            address: '',
            tag: '',
        },
        resolver: function (data, context, options) {
            return yupResolver(WithdrawValidation(networkObject, Number(feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo.floatFee), selectedCoin))(data, context, options);
        },
    }), handleSubmit = _k.handleSubmit, control = _k.control, watch = _k.watch, setValue = _k.setValue, getValues = _k.getValues, trigger = _k.trigger, _l = _k.formState, isValid = _l.isValid, errors = _l.errors;
    var network = watch('network');
    var coinObject = coins[selectedCoin];
    var networkObject = network && ((_b = coinObject === null || coinObject === void 0 ? void 0 : coinObject.networks) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.network === network; }));
    var networkOptions = useMemo(function () {
        var _a;
        return coinObject
            ? (_a = coinObject.networks) === null || _a === void 0 ? void 0 : _a.map(function (n) { return ({
                label: n.name,
                value: n.network,
            }); })
            : [];
    }, [coinObject]);
    var feeInfo = useGenerateWithdrawFeeQuery({
        network: network,
        coin: selectedCoin,
    }, {
        skip: !network,
        pollingInterval: 7500,
    }).data;
    var _m = useWithdrawMutation(), withdraw = _m[0], withdrawStatus = _m[1];
    var check2FA = useCheck2FA({
        status: withdrawStatus,
    });
    var handleWithdraw = function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            check2FA(function (code) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, withdraw(__assign({ network: confirmationData.network, coin: confirmationData.coin, address: confirmationData.address, amount: confirmationData.amount.value.toString(), fee: feeInfo.key, memo: confirmationData.tag }, (code && { code: code }))).unwrap()];
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
    useEffect(function () {
        if (coinObject) {
            setValue('network', coinObject.networks.length === 1
                ? coinObject.networks[0].network
                : null, { shouldValidate: true });
        }
    }, [networkOptions]);
    useEffect(function () {
        var _a = getValues(), amount = _a.amount, address = _a.address;
        if (amount === null || amount === void 0 ? void 0 : amount.value) {
            trigger('amount');
        }
        if (address) {
            trigger('address');
        }
    }, [network, feeInfo]);
    if (isLoadingBalances) {
        return React.createElement(CenteredLoader, null);
    }
    var feesPaidFromZigBalance = (feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo.feeCurrency) === 'ZIG' && selectedCoin !== 'ZIG';
    var feeCoin = feesPaidFromZigBalance ? 'ZIG' : selectedCoin;
    var notEnoughZig = feeCoin === 'ZIG' && ((_c = balances === null || balances === void 0 ? void 0 : balances.ZIG) === null || _c === void 0 ? void 0 : _c.balance) < parseFloat(feeInfo === null || feeInfo === void 0 ? void 0 : feeInfo.floatFee);
    var balance = (_e = (_d = balances[selectedCoin]) === null || _d === void 0 ? void 0 : _d.availableBalance) !== null && _e !== void 0 ? _e : 0;
    if (confirmationData) {
        return (React.createElement(WithdrawConfirmForm, __assign({ coin: selectedCoin, back: function () {
                setConfirmationData(null);
                setStep('');
            }, close: close }, confirmationData, { amount: Number(confirmationData.amount.value), networkName: networkObject.name, networkCoin: networkObject.network, action: handleWithdraw, status: withdrawStatus, fee: Number(feeInfo.floatFee), feeCoin: feeCoin, iconBucket: 'coins' })));
    }
    return (React.createElement("form", { onSubmit: handleSubmit(function (data) {
            setStep('confirm');
            setConfirmationData(__assign(__assign({}, data), { coin: selectedCoin }));
        }), autoComplete: 'off' },
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, null, t('description'))),
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Box, { display: 'flex', gap: '11px', pt: 3 },
                    React.createElement(ZigCoinIcon, { size: 'small', coin: selectedCoin, name: coinObject === null || coinObject === void 0 ? void 0 : coinObject.name, bucket: 'coins' }),
                    React.createElement(ZigTypography, { fontWeight: 600 }, selectedCoin),
                    "\u00A0")),
            React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                React.createElement(Controller, { name: 'network', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(ZigSelect, __assign({ menuPosition: 'fixed', menuShouldBlockScroll: true, menuShouldScrollIntoView: false, label: t('networkSelector.label'), placeholder: t('networkSelector.placeholder'), options: networkOptions }, field)));
                    } })),
            !!network && !(networkObject === null || networkObject === void 0 ? void 0 : networkObject.withdrawEnable) ? (React.createElement(Box, { mt: 2 },
                React.createElement(ErrorMessage, { text: t('wallet:notAvailable') }))) : (React.createElement(React.Fragment, null,
                React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(Controller, { name: 'address', control: control, rules: { required: true }, render: function (_a) {
                            var _b;
                            var field = _a.field;
                            return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('withdrawAddress.label'), placeholder: t('withdrawAddress.placeholder'), error: t((_b = errors.address) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                        } })),
                !!(networkObject === null || networkObject === void 0 ? void 0 : networkObject.memoRegex) && (React.createElement(Grid, { item: true, xs: 12, pt: 3 },
                    React.createElement(Controller, { name: 'tag', control: control, rules: { required: true }, render: function (_a) {
                            var _b;
                            var field = _a.field;
                            return (React.createElement(ZigInput, __assign({ fullWidth: true, label: t('withdrawMemo.label'), placeholder: t('withdrawMemo.placeholder'), error: t((_b = errors.tag) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                        } }))),
                coinObject && (React.createElement(Grid, { item: true, xs: 12, mt: 3 },
                    React.createElement(InputAmountAdvanced, { name: 'amount', control: control, label: t('amountToWithdraw.label'), showUnit: true, showBalance: false, placeholder: '0.0', iconBucket: 'coins', tokens: [
                            {
                                id: selectedCoin,
                                balance: balance,
                            },
                        ], error: t((_g = (_f = errors === null || errors === void 0 ? void 0 : errors.amount) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.message) ||
                            (notEnoughZig && (React.createElement(React.Fragment, null,
                                t('notEnoughZig'),
                                "\u00A0",
                                React.createElement(Link, { href: '#', onClick: function () {
                                        close();
                                        setTimeout(function () {
                                            showModal(WalletDepositModal, {
                                                selectedCoin: 'ZIG',
                                                coins: coins,
                                            });
                                        });
                                    } }, t('wallet:buy.deposit.depositCoin', {
                                    coin: 'ZIG',
                                }))))) }),
                    React.createElement(Box, { mt: 1 },
                        React.createElement(LabelValueLine, { label: t('amountToWithdraw.labelBalance'), value: balance.toString(), coin: selectedCoin })),
                    feeInfo && (React.createElement(LabelValueLine, { label: t('amountToWithdraw.fee'), value: feeInfo.floatFee, coin: feeCoin })))),
                React.createElement(ModalActions, { align: 'right' },
                    React.createElement(Button, { id: 'withdraw__close', size: 'large', type: 'button', variant: 'secondary', caption: t('common:close'), onClick: close }),
                    React.createElement(Button, { id: 'withdraw__continue', size: 'large', type: 'submit', caption: t('confirmation.continue'), disabled: !isValid || !feeInfo || notEnoughZig })))))));
}
export default WalletWithdrawForm;
//# sourceMappingURL=WalletWithdrawForm.js.map