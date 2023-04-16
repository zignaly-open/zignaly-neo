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
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { MinBalanceModalValidation } from './validation';
import BigNumber from 'bignumber.js';
import { Button, InputAmountAdvanced, ZigTypography } from '@zignaly-open/ui';
import { useServiceDetails, useTraderServiceManagement, useTraderServiceUpdateMinimum, } from '../../../../apis/service/use';
import { Box } from '@mui/material';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from 'components/ZModal';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
function MinBalanceModal(_a) {
    var _b, _c;
    var close = _a.close, serviceId = _a.serviceId, props = __rest(_a, ["close", "serviceId"]);
    var t = useTranslation(['management', 'common']).t;
    var _d = useTraderServiceManagement(serviceId), isLoadingManagement = _d.isLoading, management = _d.data;
    var _e = useServiceDetails(serviceId), isLoadingService = _e.isLoading, service = _e.data;
    var toast = useToast();
    var minimumBalance = management === null || management === void 0 ? void 0 : management.minimumSca;
    var coin = {
        id: service === null || service === void 0 ? void 0 : service.ssc,
        balance: new BigNumber(minimumBalance).toFixed(),
    };
    var _f = useForm({
        mode: 'onChange',
        defaultValues: {
            amountValue: {
                token: coin,
                value: minimumBalance,
            },
        },
        resolver: yupResolver(MinBalanceModalValidation),
    }), handleSubmit = _f.handleSubmit, control = _f.control, _g = _f.formState, isValid = _g.isValid, errors = _g.errors, isDirty = _g.isDirty;
    var _h = useTraderServiceUpdateMinimum(serviceId), update = _h[0], isUpdating = _h[1].isLoading;
    var onSubmit = useCallback(function (_a) {
        var _b;
        var amountValue = _a.amountValue;
        update((_b = amountValue.value) === null || _b === void 0 ? void 0 : _b.toString()).then(function () {
            toast.success(t('management:minBalance.success'));
            close();
        });
    }, []);
    return (React.createElement(ZModal, __assign({ authOnly: true, wide: true }, props, { title: t('minBalanceModal.title'), close: close }),
        React.createElement(Box, { sx: { marginBottom: 3 } },
            React.createElement(ZigTypography, null, t('minBalanceModal.desc'))),
        React.createElement("form", { noValidate: true, onSubmit: handleSubmit(onSubmit) },
            React.createElement(InputAmountAdvanced, { label: t('common:amount') + ':', placeholder: t('minBalanceModal.placeholder'), labelBalance: t('minBalanceModal.labelBalance'), control: control, name: 'amountValue', fullWidth: true, showMaxButton: false, error: isDirty && t((_c = (_b = errors === null || errors === void 0 ? void 0 : errors.amountValue) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.message), enableMaxAmountMessage: false, tokens: [coin], showUnit: true }),
            React.createElement(ModalActions, null,
                React.createElement(Button, { id: 'edit-balance__save', loading: isLoadingManagement || isLoadingService || isUpdating, caption: t('minBalanceModal.save'), disabled: !isValid, size: 'xlarge', type: 'submit' })))));
}
export default MinBalanceModal;
//# sourceMappingURL=index.js.map