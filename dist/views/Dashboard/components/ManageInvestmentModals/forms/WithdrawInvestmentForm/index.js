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
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import { WithdrawActions } from '../../styles';
import { Button, InputAmountAdvanced, SliderInput, Typography, } from '@zignaly-open/ui';
import BigNumber from 'bignumber.js';
import { useInvestmentDetails, useSelectedInvestment, useWithdrawInvestment, } from '../../../../../../apis/investment/use';
import { EditInvestmentValidation, EditInvestmentValidationOwner, } from './validations';
import { EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import CenteredLoader from '../../../../../../components/CenteredLoader';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
import { useServiceDetails } from '../../../../../../apis/service/use';
var WithdrawInvestmentForm = function (_a) {
    var _b, _c, _d, _e;
    var setView = _a.setView;
    var _f = useWithdrawInvestment(), isLoading = _f.isLoading, withdraw = _f.withdraw;
    var _g = useSelectedInvestment(), serviceId = _g.serviceId, ssc = _g.ssc;
    var _h = useInvestmentDetails(serviceId), isLoadingDetails = _h.isLoading, service = _h.data;
    var serviceInfo = useServiceDetails(serviceId).data;
    var coin = useMemo(function () { return ({
        id: ssc,
        balance: new BigNumber(service.invested)
            .plus(new BigNumber(service.pending))
            .toString(),
    }); }, [service]);
    var serviceTypesInfo = useTraderServiceTypesInfoQuery().data;
    var minInvestedAmountOwner = (_c = (_b = serviceTypesInfo === null || serviceTypesInfo === void 0 ? void 0 : serviceTypesInfo[serviceInfo.type]) === null || _b === void 0 ? void 0 : _b[coin.id]) === null || _c === void 0 ? void 0 : _c.minimum_owner_balance;
    var t = useTranslation('withdraw').t;
    var toast = useToast();
    var _j = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            amountTransfer: {
                value: '',
                token: coin,
            },
        },
        resolver: service.accountType === 'owner'
            ? yupResolver(EditInvestmentValidationOwner(minInvestedAmountOwner))
            : yupResolver(EditInvestmentValidation),
    }), handleSubmit = _j.handleSubmit, control = _j.control, watch = _j.watch, setValue = _j.setValue, trigger = _j.trigger, _k = _j.formState, errors = _k.errors, isDirty = _k.isDirty, isValid = _k.isValid;
    var watchAmountTransfer = watch('amountTransfer');
    var onSubmit = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, withdraw({
                        amount: (_a = values.amountTransfer) === null || _a === void 0 ? void 0 : _a.value,
                        serviceId: serviceId,
                    })];
                case 1:
                    _b.sent();
                    toast.success(t('edit-investment:withdrawInvestmentSuccess'));
                    setView(EditInvestmentViews.WithdrawSuccess);
                    return [2];
            }
        });
    }); };
    var tokenBalance = new BigNumber(coin.balance);
    var amount = new BigNumber(watchAmountTransfer === null || watchAmountTransfer === void 0 ? void 0 : watchAmountTransfer.value);
    var sliderValue = +amount
        .multipliedBy(new BigNumber(100))
        .div(tokenBalance)
        .dp(2);
    if (isNaN(sliderValue))
        sliderValue = 0;
    sliderValue = Math.min(sliderValue, 100);
    if (isLoadingDetails) {
        return React.createElement(CenteredLoader, null);
    }
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        React.createElement(Box, { sx: { mt: 1, mb: 2 } },
            React.createElement(Typography, null, t('replace-existing-amount'))),
        React.createElement(Grid, { container: true, spacing: 5 },
            React.createElement(Grid, { item: true, xs: 12, md: 6 },
                React.createElement(InputAmountAdvanced, { name: 'amountTransfer', control: control, label: t('form.label'), labelBalance: t('form.labelBalance'), showUnit: true, placeholder: '0.0', tokens: [coin], error: isDirty &&
                        t((_e = (_d = errors === null || errors === void 0 ? void 0 : errors.amountTransfer) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.message, {
                            minAmount: minInvestedAmountOwner,
                            minAmountCoin: coin.id,
                        }) })),
            React.createElement(Grid, { item: true, xs: 12, md: 6 },
                React.createElement(Box, { marginTop: 5 },
                    React.createElement(SliderInput, { value: sliderValue, initialValue: 0, onChange: function (value) {
                            var _a;
                            if (!((_a = watch('amountTransfer')) === null || _a === void 0 ? void 0 : _a.value) && !value) {
                                return;
                            }
                            setValue('amountTransfer', __assign(__assign({}, watchAmountTransfer), { value: parseFloat(new BigNumber(coin.balance)
                                    .multipliedBy(value)
                                    .dividedBy(100)
                                    .toFixed(8)) }));
                            trigger('amountTransfer');
                        } })))),
        React.createElement(WithdrawActions, null,
            React.createElement(Button, { id: 'withdraw__confirm-withdraw', size: 'xlarge', disabled: !isValid, caption: t('button'), loading: isLoading }))));
};
export default WithdrawInvestmentForm;
//# sourceMappingURL=index.js.map