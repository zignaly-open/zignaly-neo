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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, TitleHead } from './styles';
import { ForgotPasswordValidation } from './validations';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../routes';
import { Button, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useResetPasswordRequestMutation } from 'apis/user/api';
import AnchorLink from 'components/AnchorLink';
var ForgotPasswordForm = function () {
    var t = useTranslation(['auth', 'error']).t;
    var _a = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        resolver: yupResolver(ForgotPasswordValidation),
    }), handleSubmit = _a.handleSubmit, control = _a.control, _b = _a.formState, errors = _b.errors, isValid = _b.isValid;
    var _c = useResetPasswordRequestMutation(), resetPassword = _c[0], resetPasswordStatus = _c[1];
    var submit = function (data) {
        resetPassword(data);
    };
    if (resetPasswordStatus.isSuccess) {
        return (React.createElement(Box, { sx: { width: '100%', p: 4, maxWidth: 700 }, gap: 4.75, display: 'flex', flexDirection: 'column' },
            React.createElement(TitleHead, null,
                React.createElement(ZigTypography, { variant: 'h2' }, t('reset-password.reset-password'))),
            React.createElement(ZigTypography, { textAlign: 'center' }, t('reset-password.email-sent'))));
    }
    return (React.createElement(Box, { sx: { width: '100%', p: 4, maxWidth: 500 } },
        React.createElement(TitleHead, null,
            React.createElement(ZigTypography, { variant: 'h2' }, t('reset-password.reset-password'))),
        React.createElement(Form, { onSubmit: handleSubmit(submit) },
            React.createElement(Controller, { name: 'email', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ label: t('login-form.inputText.email.label') + ':', placeholder: t('login-form.inputText.email.label'), disabled: resetPasswordStatus.isLoading, error: t((_b = errors.email) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                } }),
            React.createElement(Box, { display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5, gap: 5 },
                React.createElement(Button, { type: 'submit', variant: 'primary', caption: t('reset-password.send-instructions'), size: 'xlarge', loading: resetPasswordStatus.isLoading, disabled: !isValid, id: 'forgotpassword__submit' }),
                React.createElement(Box, { display: 'flex', flexDirection: 'column', alignItems: 'center' },
                    React.createElement(ZigTypography, { variant: 'body2', fontWeight: 500 }, t('reset-password.found-password')),
                    React.createElement(ZigTypography, { variant: 'body2' },
                        React.createElement(Trans, { i18nKey: 'reset-password.login-signup', t: t, components: [
                                React.createElement(AnchorLink, { to: ROUTE_LOGIN, key: 'login' }),
                                React.createElement(AnchorLink, { to: ROUTE_SIGNUP, key: 'signup' }),
                            ] })))))));
};
export default ForgotPasswordForm;
//# sourceMappingURL=index.js.map