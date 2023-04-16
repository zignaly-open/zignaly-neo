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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Field, Form } from './styles';
import { Button, CoinIcon, InputAmountAdvanced, InputText, SliderInput, Typography, ZigButton, } from '@zignaly-open/ui';
import { EditInvestmentValidation } from './validations';
import { useCurrentBalance, useInvestInService, useSelectedInvestment, } from '../../../../../../apis/investment/use';
import { useToast } from '../../../../../../util/hooks/useToast';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { Box } from '@mui/material';
import { CheckBox } from '@zignaly-open/ui';
import { AmountInvested, TokenValue } from '../EditInvestmentForm/styles';
import { NumericFormat } from 'react-number-format';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { Add } from '@mui/icons-material';
import DepositModal from '../../DepositModal';
import { useZModal } from '../../../../../../components/ZModal/use';
function InvestForm(_a) {
    var _this = this;
    var _b, _c;
    var close = _a.close, onInvested = _a.onInvested;
    var coin = useCurrentBalance();
    var t = useTranslation('edit-investment').t;
    var service = useSelectedInvestment();
    var _d = useInvestInService(service.serviceId), isLoading = _d.isLoading, invest = _d.invest;
    var serviceDetails = useServiceDetails(service.serviceId).data;
    var toast = useToast();
    var showModal = useZModal().showModal;
    var transferMagicWord = t('invest-modal.transfer-label');
    var _e = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            amountTransfer: {
                value: '',
                token: coin,
            },
            transferLabelForValidation: transferMagicWord,
            transferConfirm: '',
            profitPercentage: 30,
            step: 1,
        },
        resolver: yupResolver(EditInvestmentValidation({
            max: new BigNumber(serviceDetails.maximumSbt)
                .minus(serviceDetails.invested)
                .minus(serviceDetails.pending)
                .toString(),
            coin: service.ssc,
        })),
    }), handleSubmit = _e.handleSubmit, control = _e.control, setValue = _e.setValue, watch = _e.watch, trigger = _e.trigger, _f = _e.formState, isValid = _f.isValid, isDirty = _f.isDirty, errors = _f.errors;
    var canSubmit = isValid && Object.keys(errors).length === 0;
    var onSubmitFirstStep = function () {
        setValue('transferConfirm', '');
        setValue('step', 2);
    };
    var onGoBackToFirstStep = function () {
        setValue('step', 1);
        trigger('transferConfirm');
    };
    var isConfirmation = watch('step') === 2;
    var onSubmitSecondStep = function (_a) {
        var profitPercentage = _a.profitPercentage, amountTransfer = _a.amountTransfer;
        return __awaiter(_this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, invest({
                            profitPercentage: profitPercentage,
                            amount: (_b = amountTransfer === null || amountTransfer === void 0 ? void 0 : amountTransfer.value) === null || _b === void 0 ? void 0 : _b.toString(),
                        })];
                    case 1:
                        _d.sent();
                        toast.success(t('edit-investment:addMoreInvestmentSuccess', {
                            amount: amountTransfer === null || amountTransfer === void 0 ? void 0 : amountTransfer.value,
                            currency: (_c = amountTransfer === null || amountTransfer === void 0 ? void 0 : amountTransfer.token) === null || _c === void 0 ? void 0 : _c.id,
                            serviceName: service.serviceName,
                        }));
                        onInvested();
                        return [2];
                }
            });
        });
    };
    return (React.createElement(Form, { onSubmit: handleSubmit(isConfirmation ? onSubmitSecondStep : onSubmitFirstStep) },
        React.createElement(Field, null,
            React.createElement("div", null, isConfirmation ? (React.createElement(React.Fragment, null,
                React.createElement(Typography, { variant: 'body1' }, t('invest-modal.amount-to-invest')),
                React.createElement(AmountInvested, null,
                    React.createElement(CoinIcon, { coin: coin.id, name: 'coin-icon' }),
                    React.createElement(TokenValue, null,
                        React.createElement(Typography, { variant: 'bigNumber', color: 'neutral100' },
                            React.createElement(NumericFormat, { value: watch('amountTransfer').value.toString(), displayType: 'text', thousandSeparator: true })),
                        React.createElement(Typography, { variant: 'h3', color: 'neutral400' }, String(coin.id).toUpperCase()))))) : (React.createElement(React.Fragment, null,
                React.createElement(InputAmountAdvanced, { name: 'amountTransfer', control: control, label: t('form.inputAmount.label'), labelBalance: t('form.inputAmount.labelBalance'), showUnit: true, placeholder: '0.0', tokens: [coin], error: isDirty && t((_c = (_b = errors === null || errors === void 0 ? void 0 : errors.amountTransfer) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.message) }),
                React.createElement(Box, null,
                    React.createElement(ZigButton, { id: 'account-menu-dropdown__deposit', startIcon: React.createElement(Add, null), sx: {
                            fontWeight: 400,
                            mt: 1,
                            color: function (theme) { return theme.palette.links; },
                        }, variant: 'text', onClick: function () {
                            return showModal(DepositModal, {
                                ctaId: 'account-menu-deposit',
                                selectedCoin: coin.id,
                            });
                        } }, t('action:deposit-coin', { coin: coin.id })))))),
            React.createElement("div", null, isConfirmation ? (React.createElement(React.Fragment, null,
                React.createElement(Typography, { variant: 'body1' }, t('form.profits.title-confirmation')),
                React.createElement(AmountInvested, null,
                    React.createElement(TokenValue, null,
                        React.createElement(Typography, { variant: 'bigNumber', color: 'neutral100' },
                            React.createElement(NumericFormat, { value: watch('profitPercentage').toString(), displayType: 'text', suffix: '%', thousandSeparator: true })))))) : (React.createElement(Controller, { name: 'profitPercentage', control: control, rules: { required: true }, render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(SliderInput, { mode: 'range', labels: {
                            top: t('form.profits.title'),
                            left: t('form.profits.left'),
                            right: t('form.profits.right'),
                        }, value: field.value, initialValue: field.value, onChange: field.onChange }));
                } })))),
        React.createElement(Box, { sx: { mt: 4, display: isConfirmation ? 'block' : 'none' } },
            React.createElement(Controller, { name: 'transferConfirm', control: control, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(InputText, __assign({ label: t('invest-modal.type-transfer', {
                            word: transferMagicWord,
                        }), placeholder: transferMagicWord, disabled: isLoading, error: t((_b = errors.transferConfirm) === null || _b === void 0 ? void 0 : _b.message) }, __assign(__assign({}, field), { value: typeof field.value === 'string' ? field.value : '' }))));
                } })),
        React.createElement(Box, { sx: {
                display: isConfirmation ? 'none' : 'flex',
                flexDirection: 'column',
                gap: 2.5,
                mt: 5,
                mb: 5,
            } },
            React.createElement(Controller, { control: control, name: 'understandMargin', defaultValue: false, render: function (_a) {
                    var _b = _a.field, onChange = _b.onChange, value = _b.value;
                    return (React.createElement(CheckBox, { onChange: onChange, value: value, label: t('invest-modal.i-understand-margin', {
                            coin: service.ssc,
                        }) }));
                } }),
            React.createElement(Controller, { control: control, name: 'understandMoneyTransferred', defaultValue: false, render: function (_a) {
                    var _b = _a.field, onChange = _b.onChange, value = _b.value;
                    return (React.createElement(CheckBox, { onChange: onChange, value: value, label: t('invest-modal.i-understand-money-transferred') }));
                } })),
        React.createElement(ModalActions, null,
            React.createElement(Box, { sx: {
                    fledDirection: 'column',
                    display: 'flex',
                    width: '100%',
                    gap: '20px',
                    justifyContent: 'flex-end',
                } },
                React.createElement(Button, { id: 'invest-close', size: 'large', type: 'button', disabled: isLoading, variant: 'secondary', caption: t(isConfirmation ? 'common:back' : 'common:close'), onClick: isConfirmation ? onGoBackToFirstStep : close }),
                React.createElement(Button, { id: 'invest-confirm', size: 'large', type: 'submit', loading: isLoading, caption: isConfirmation
                        ? t('form.button.invest-now', {
                            amount: watch('amountTransfer').value.toString(),
                            coin: coin.id,
                        })
                        : t('form.button.continue-to-confirmation'), disabled: !canSubmit })))));
}
export default InvestForm;
//# sourceMappingURL=index.js.map