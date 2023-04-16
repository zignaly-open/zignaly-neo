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
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Tooltip, useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { AmountInvested, Field, Form, InputContainer, Row, TokenValue, } from './styles';
import { ArrowRightIcon, Button, CoinIcon, InputAmountAdvanced, PlusIcon, SliderInput, TextButton, Typography, } from '@zignaly-open/ui';
import { EditInvestmentValidation } from './validations';
import { useCurrentBalance, useInvestmentDetails, useSelectedInvestment, useUpdateTakeProfitAndInvestMore, useUpdateTakeProfitPercentage, } from '../../../../../../apis/investment/use';
import { EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
function EditInvestmentForm(_a) {
    var _this = this;
    var _b, _c;
    var onClickWithdrawInvestment = _a.onClickWithdrawInvestment, close = _a.close, setView = _a.setView;
    var coin = useCurrentBalance();
    var theme = useTheme();
    var t = useTranslation('edit-investment').t;
    var _d = useState(false), isInputEnabled = _d[0], setInputEnabled = _d[1];
    var _e = useSelectedInvestment(), serviceId = _e.serviceId, serviceName = _e.serviceName;
    var _f = useUpdateTakeProfitPercentage(serviceId), isEditingPercent = _f.isLoading, editPercent = _f.edit;
    var _g = useUpdateTakeProfitAndInvestMore(serviceId), isEditingInvestment = _g.isLoading, editInvestment = _g.edit;
    var details = useInvestmentDetails(serviceId).data;
    var service = useServiceDetails(serviceId).data;
    var transferOutAll = details === null || details === void 0 ? void 0 : details.transferOutAll;
    var _h = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            amountTransfer: {
                value: '',
                token: coin,
            },
            profitPercentage: details === null || details === void 0 ? void 0 : details.profitPercentage,
        },
        resolver: isInputEnabled
            ? yupResolver(EditInvestmentValidation({
                max: new BigNumber(service.maximumSbt)
                    .minus(service.invested)
                    .minus(service.pending)
                    .toString(),
                coin: service.ssc,
            }))
            : null,
    }), handleSubmit = _h.handleSubmit, control = _h.control, _j = _h.formState, isValid = _j.isValid, isDirty = _j.isDirty, errors = _j.errors;
    var toast = useToast();
    var openBlockedToast = function () { return toast.error(t('error-blockedInvestment')); };
    var isLoading = isEditingPercent || isEditingInvestment;
    var canSubmit = isValid && Object.keys(errors).length === 0;
    var onSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!isInputEnabled) return [3, 2];
                    return [4, editInvestment({
                            profitPercentage: values.profitPercentage,
                            amount: (_a = values === null || values === void 0 ? void 0 : values.amountTransfer) === null || _a === void 0 ? void 0 : _a.value,
                        })];
                case 1:
                    _e.sent();
                    toast.success(t('edit-investment:addMoreInvestmentSuccess', {
                        amount: (_b = values === null || values === void 0 ? void 0 : values.amountTransfer) === null || _b === void 0 ? void 0 : _b.value,
                        currency: (_d = (_c = values === null || values === void 0 ? void 0 : values.amountTransfer) === null || _c === void 0 ? void 0 : _c.token) === null || _d === void 0 ? void 0 : _d.id,
                        serviceName: serviceName,
                    }));
                    setView(EditInvestmentViews.EditInvestmentSuccess);
                    return [3, 4];
                case 2: return [4, editPercent({
                        profitPercentage: values.profitPercentage,
                    })];
                case 3:
                    _e.sent();
                    toast.success(t('edit-investment:percentageChangedSuccess'));
                    close();
                    _e.label = 4;
                case 4: return [2];
            }
        });
    }); };
    var maxReached = +service.invested + service.pending >= service.maximumSbt;
    var tooltipWrap = function (v) {
        return maxReached ? (React.createElement(Tooltip, { title: t('service:invest-button.max-reached-tooltip') }, v)) : (v);
    };
    return (React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
        React.createElement(Field, null,
            React.createElement(Row, null,
                React.createElement(Typography, { variant: 'body1' }, t('form.title')),
                React.createElement(AmountInvested, null,
                    React.createElement(CoinIcon, { coin: coin.id }),
                    React.createElement(TokenValue, null,
                        React.createElement(Typography, { variant: 'bigNumber', color: 'neutral100' },
                            React.createElement(NumericFormat, { value: details === null || details === void 0 ? void 0 : details.invested, displayType: 'text', thousandSeparator: true })),
                        React.createElement(Typography, { variant: 'h3', color: 'neutral400' }, String(coin.id).toUpperCase())))),
            React.createElement(Row, null,
                React.createElement(Controller, { name: 'profitPercentage', control: control, rules: { required: true }, render: function (_a) {
                        var field = _a.field;
                        return (React.createElement(SliderInput, { mode: 'range', labels: {
                                top: t('form.profits.title'),
                                left: t('form.profits.left'),
                                right: t('form.profits.right'),
                            }, value: field.value, initialValue: field.value, onChange: field.onChange }));
                    } }))),
        isInputEnabled && coin && (React.createElement(InputContainer, null,
            React.createElement(InputAmountAdvanced, { name: 'amountTransfer', control: control, label: t('form.inputAmount.label'), labelBalance: t('form.inputAmount.labelBalance'), showUnit: true, placeholder: '0.0', tokens: [coin], error: isDirty && t((_c = (_b = errors === null || errors === void 0 ? void 0 : errors.amountTransfer) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.message) }))),
        React.createElement(ModalActions, null,
            !isInputEnabled &&
                tooltipWrap(React.createElement("div", null,
                    React.createElement(TextButton, { id: 'edit-investment__invest-more', onClick: function () {
                            return !maxReached &&
                                (transferOutAll ? openBlockedToast() : setInputEnabled(true));
                        }, disabled: transferOutAll || maxReached, allowClickOnDisabled: true, as: 'span', leftElement: React.createElement(PlusIcon, { color: theme[transferOutAll ? 'neutral300' : 'links'], width: '22px', height: '22px' }), caption: t('form.link.investMore') }))),
            React.createElement(Button, { id: isInputEnabled
                    ? 'edit-investment__save-invest'
                    : 'edit-investment__save-close', size: 'large', type: 'submit', loading: isLoading, caption: isInputEnabled
                    ? t('form.button.saveAndInvestment')
                    : t('form.button.saveAndClose'), disabled: isInputEnabled ? !canSubmit : false }),
            React.createElement(TextButton, { id: 'edit-investment__withdraw', rightElement: React.createElement(ArrowRightIcon, { width: '22px', height: '22px', color: theme[transferOutAll ? 'neutral300' : 'links'] }), allowClickOnDisabled: true, as: 'span', disabled: transferOutAll, onClick: transferOutAll ? openBlockedToast : onClickWithdrawInvestment, caption: t('form.link.withdraw') }))));
}
export default EditInvestmentForm;
//# sourceMappingURL=index.js.map