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
import { useTranslation } from 'react-i18next';
import { InputAmountAdvanced, ZigButton, ZigTypography, } from '@zignaly-open/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { InvestInYourServiceValidation } from '../validations';
import { Grid } from '@mui/material';
import InvestorDetailsForService from '../../../../../Dashboard/components/ManageInvestmentModals/views/InvestorDetailsForService';
import { useCurrentBalance } from '../../../../../../apis/investment/use';
import { useCreateTraderServiceMutation, useTraderServiceTypesInfoQuery, } from '../../../../../../apis/service/api';
import { useActiveExchange } from '../../../../../../apis/user/use';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE_MANAGE } from '../../../../../../routes';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
var InvestInYourServiceForm = function (_a) {
    var _b, _c, _d, _e, _f;
    var service = _a.service, goBack = _a.goBack;
    var t = useTranslation(['service', 'edit-investment']).t;
    var coin = useCurrentBalance(service.baseCurrency);
    var exchange = useActiveExchange();
    var navigate = useNavigate();
    var _g = useCreateTraderServiceMutation(), createService = _g[0], isLoading = _g[1].isLoading;
    var serviceTypesInfo = useTraderServiceTypesInfoQuery().data;
    var minValue = ((_c = (_b = serviceTypesInfo === null || serviceTypesInfo === void 0 ? void 0 : serviceTypesInfo[service.serviceType]) === null || _b === void 0 ? void 0 : _b[service.baseCurrency]) === null || _c === void 0 ? void 0 : _c.minimum_owner_balance) || 0;
    var _h = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        resolver: yupResolver(InvestInYourServiceValidation),
        defaultValues: {
            amountToInvest: {
                value: '',
                token: __assign(__assign({}, coin), { min: minValue }),
            },
        },
    }), handleSubmit = _h.handleSubmit, control = _h.control, errors = _h.formState.errors;
    var onSubmit = function (_a) {
        var amountToInvest = _a.amountToInvest;
        return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, createService({
                            name: service.serviceName,
                            type: service.serviceType.toLocaleUpperCase(),
                            amount: amountToInvest.value,
                            ssc: service.baseCurrency,
                            successFee: service.successFee,
                            exchangeInternalId: exchange.internalId,
                        })];
                    case 1:
                        result = _b.sent();
                        if ('data' in result) {
                            navigate(generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                                serviceId: result.data.id,
                            }));
                        }
                        return [2];
                }
            });
        });
    };
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        React.createElement(InvestorDetailsForService, { service: {
                successFee: (_d = service.successFee) === null || _d === void 0 ? void 0 : _d.toString(),
                serviceName: service.serviceName,
            } }),
        React.createElement(Grid, { container: true, spacing: 5 },
            React.createElement(Grid, { item: true, xs: 12, md: 12 },
                React.createElement(InputAmountAdvanced, { name: 'amountToInvest', control: control, disabled: isLoading, label: React.createElement("div", null,
                        t('edit-investment:form.inputAmount.label'),
                        React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t('create.minimum-balance', {
                            minValue: minValue,
                            minValueCoin: coin.id,
                        }))), labelBalance: t('edit-investment:form.inputAmount.labelBalance'), showUnit: true, placeholder: '0.0', tokens: [service.baseCurrency], error: t((_f = (_e = errors === null || errors === void 0 ? void 0 : errors.amountToInvest) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.message, {
                        minValue: minValue,
                        minValueCoin: coin.id,
                    }) }))),
        React.createElement(ModalActionsNew, null,
            React.createElement(ZigButton, { id: 'confirm__back', onClick: goBack, variant: 'outlined', size: 'large' }, t('common:back')),
            React.createElement(ZigButton, { variant: 'contained', type: 'submit', loading: isLoading, id: 'create-service-modal__invest-and-create', size: 'large' }, t('create.action')))));
};
export default InvestInYourServiceForm;
//# sourceMappingURL=InvestInYourServiceForm.js.map