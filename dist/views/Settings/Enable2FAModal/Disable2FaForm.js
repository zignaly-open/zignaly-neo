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
import React from 'react';
import { Box } from '@mui/material';
import { ErrorMessage, ZigButton, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDisable2FAMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { TwoFAValidation } from './validations';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useToast } from 'util/hooks/useToast';
import { useDispatch } from 'react-redux';
import { enable2FA } from 'apis/user/store';
var Disable2FAForm = function (_a) {
    var close = _a.close;
    var t = useTranslation('settings').t;
    var _b = useForm({
        mode: 'onChange',
        resolver: yupResolver(TwoFAValidation),
    }), handleSubmit = _b.handleSubmit, control = _b.control, _c = _b.formState, errors = _c.errors, isValid = _c.isValid, setError = _b.setError;
    var _d = useDisable2FAMutation(), disable2FA = _d[0], disable2FAStatus = _d[1];
    var toast = useToast();
    var dispatch = useDispatch();
    var onSubmit = function (data) {
        disable2FA(data)
            .unwrap()
            .then(function () {
            toast.success(t('disable-2fa.success'));
            dispatch(enable2FA(false));
            close();
        })
            .catch(function (e) {
            var _a;
            if (((_a = e.data.error) === null || _a === void 0 ? void 0 : _a.code) === 37) {
                setError('code', {
                    type: 'notMatch',
                    message: t("error:error.".concat(e.data.error.code)),
                });
            }
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, { whiteSpace: 'pre-line' }, t('disable-2fa.description'))),
        React.createElement(ErrorMessage, { text: t('disable-2fa.security') }),
        React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
            React.createElement(Controller, { name: 'code', control: control, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ label: t('enable-2fa.enter-code'), placeholder: t('enable-2fa.code-2fa'), error: t((_b = errors.code) === null || _b === void 0 ? void 0 : _b.message), type: 'text' }, field)));
                } }),
            React.createElement(ModalActionsNew, { align: 'right' },
                React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large', id: 'disable-2fa__cancel' }, t('action:cancel')),
                React.createElement(ZigButton, { id: 'disable-2fa__submit', type: 'submit', variant: 'contained', size: 'large', loading: disable2FAStatus.isLoading, disabled: !isValid }, t('disable-2fa.title'))))));
};
export default Disable2FAForm;
//# sourceMappingURL=Disable2FaForm.js.map