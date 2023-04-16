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
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ZigAlertMessage, ZigButton, ZigButtonGroupInput, ZigInput, ZigSelect, ZigTypography, } from '@zignaly-open/ui';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CreateServiceValidation } from '../validations';
import CoinOption, { filterOptions, } from '../../../../../Dashboard/components/ManageInvestmentModals/forms/atoms/CoinOption';
import { useExchangeCoinsList } from '../../../../../../apis/coin/use';
import { Box, InputAdornment, Tooltip } from '@mui/material';
import { ZigButtonGroupInputWrapper } from '../atoms';
import SuccessFeeInputWrapper from './SuccessFeeInputWrapper';
import { AlertBlock, ModalActionsNew, } from 'components/ZModal/ModalContainer/styles';
import { useTraderServiceTypesInfoQuery } from '../../../../../../apis/service/api';
var CreateServiceForm = function (_a) {
    var _b;
    var service = _a.service, onSubmit = _a.onSubmit;
    var t = useTranslation('service').t;
    var coins = useExchangeCoinsList().data;
    var _c = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        resolver: yupResolver(CreateServiceValidation),
        defaultValues: service || {
            serviceName: '',
            baseCurrency: '',
        },
    }), handleSubmit = _c.handleSubmit, control = _c.control, setValue = _c.setValue, trigger = _c.trigger, watch = _c.watch, register = _c.register, errors = _c.formState.errors;
    var exchangeType = watch('serviceType');
    var serviceTypesInfo = useTraderServiceTypesInfoQuery().data;
    var coinOptions = useMemo(function () {
        var _a;
        return exchangeType
            ? (_a = Object.keys(serviceTypesInfo === null || serviceTypesInfo === void 0 ? void 0 : serviceTypesInfo[exchangeType])) === null || _a === void 0 ? void 0 : _a.map(function (ssc) {
                var _a;
                var name = ((_a = coins[ssc]) === null || _a === void 0 ? void 0 : _a.name) || '';
                return {
                    value: ssc,
                    name: name,
                    label: React.createElement(CoinOption, { key: ssc, coin: ssc, name: name }),
                };
            })
            : [];
    }, [exchangeType]);
    var serviceTypes = useMemo(function () { return [
        {
            value: 'spot',
            label: t("create.types.spot"),
            extraProps: {
                size: 'large',
                sx: { width: '50%' },
            },
        },
        {
            value: 'futures',
            label: t("create.types.futures"),
            extraProps: {
                size: 'large',
                sx: { width: '50%' },
            },
        },
    ]; }, [t]);
    register('serviceType');
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        React.createElement(ZigButtonGroupInputWrapper, { sx: { mb: 2 } },
            React.createElement(ZigButtonGroupInput, { value: exchangeType, options: serviceTypes, error: t((_b = errors.serviceType) === null || _b === void 0 ? void 0 : _b.message), onChange: function (v) {
                    setValue('serviceType', v);
                    trigger('serviceType');
                }, label: t('create.service-type') })),
        React.createElement(Controller, { name: 'baseCurrency', control: control, rules: { required: true }, render: function (_a) {
                var _b;
                var field = _a.field;
                return (React.createElement(Tooltip, { title: !exchangeType ? t('create.select-type-first') : '' },
                    React.createElement(Box, null,
                        React.createElement(ZigSelect, __assign({ disabled: !exchangeType, id: 'create-service__base-currency', menuPlacement: 'auto', menuShouldScrollIntoView: false, menuPosition: 'fixed', menuShouldBlockScroll: true, label: t('create.base-currency'), placeholder: t('create.base-currency'), options: coinOptions, error: t((_b = errors.baseCurrency) === null || _b === void 0 ? void 0 : _b.message), filterOption: filterOptions }, field)))));
            } }),
        React.createElement(Controller, { name: 'serviceName', control: control, rules: { required: true }, render: function (_a) {
                var _b;
                var field = _a.field;
                return (React.createElement(ZigInput, __assign({ sx: {
                        mt: 2,
                        mb: 2,
                    }, wide: true, id: 'create-service__service-name', label: t('create.service-name') + ':', placeholder: t('create.service-name'), error: t((_b = errors.serviceName) === null || _b === void 0 ? void 0 : _b.message) }, field)));
            } }),
        React.createElement(Controller, { name: 'successFee', control: control, render: function (_a) {
                var _b;
                var field = _a.field;
                return (React.createElement(SuccessFeeInputWrapper, { value: watch('successFee') || 0 },
                    React.createElement(ZigInput, __assign({ type: 'number', InputProps: {
                            endAdornment: React.createElement(InputAdornment, { position: 'end' }, "%"),
                        }, sx: {
                            mb: 1,
                        }, fullWidth: true, label: React.createElement("div", null,
                            t('summary.success-fee'),
                            React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t('edit.success-fee-desc'))), error: t((_b = errors.successFee) === null || _b === void 0 ? void 0 : _b.message) }, field))));
            } }),
        React.createElement(AlertBlock, null,
            React.createElement(ZigAlertMessage, { text: t('create.please-verify'), warning: true })),
        React.createElement(ModalActionsNew, null,
            React.createElement(ZigButton, { variant: 'contained', type: 'submit', id: 'create-service-modal__create-1st-step', size: 'large' }, t('create.next-step')))));
};
export default CreateServiceForm;
//# sourceMappingURL=CreateServiceForm.js.map