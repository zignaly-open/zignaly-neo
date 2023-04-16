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
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action, TitleHead } from './styles';
import { LoginValidation } from './validations';
import { useAuthenticate } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGNUP } from '../../../../routes';
import { Button, TextButton, Typography, ZigInput } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import PasswordVisibilityAdornment from '../atoms/PasswordVisibilityAdornment';
var LoginForm = function () {
    var t = useTranslation(['auth', 'error']).t;
    var _a = useForm({
        mode: 'onTouched',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: process.env.REACT_APP_TESTING_DEFAULT_EMAIL || '',
            password: process.env.REACT_APP_TESTING_DEFAULT_PASSWORD || '',
        },
        resolver: yupResolver(LoginValidation),
    }), handleSubmit = _a.handleSubmit, control = _a.control, setError = _a.setError, errors = _a.formState.errors;
    var _b = useAuthenticate(), loggingIn = _b[0].loading, authenticate = _b[1];
    var navigate = useNavigate();
    var locationState = useLocation().state;
    var _c = useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var submit = function (data) {
        authenticate(data).catch(function (e) {
            console.error(e);
            setError('email', { type: 'server', message: e.message });
            setError('password', { type: 'server', message: e.message });
        });
    };
    return (React.createElement(Box, { sx: { width: '100%', p: 4, maxWidth: 500 } },
        React.createElement(TitleHead, null,
            React.createElement(Typography, { variant: 'h2' }, t('log-in-title'))),
        React.createElement(Form, { onSubmit: handleSubmit(submit) },
            React.createElement(Controller, { name: 'email', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ id: 'login__username', label: t('login-form.inputText.email.label') + ':', placeholder: t('login-form.inputText.email.label'), disabled: loggingIn, error: t((_b = errors.email) === null || _b === void 0 ? void 0 : _b.message) }, field)));
                } }),
            React.createElement(Controller, { name: 'password', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ id: 'login__password', labelAction: {
                            tabIndex: -1,
                            text: t('login-form.inputText.password.labelForgot'),
                            onClick: function () { return navigate(ROUTE_FORGOT_PASSWORD); },
                            id: 'login__forgot-password',
                        }, label: t('login-form.inputText.password.label') + ':', placeholder: t('login-form.inputText.password.label'), disabled: loggingIn, error: t((_b = errors.password) === null || _b === void 0 ? void 0 : _b.message), type: showPassword ? 'text' : 'password', InputProps: {
                            endAdornment: (React.createElement(PasswordVisibilityAdornment, { show: showPassword, onToggle: function () { return setShowPassword(!showPassword); } })),
                        } }, field)));
                } }),
            React.createElement(Action, null,
                React.createElement(Button, { type: 'submit', variant: 'primary', id: 'login__submit', caption: t('login-form.submit'), size: 'xlarge', loading: loggingIn }),
                React.createElement(TextButton, { id: 'login__signup', onClick: function () { return navigate(ROUTE_SIGNUP, { state: locationState }); }, caption: t('login-form.link.signup') })))));
};
export default LoginForm;
//# sourceMappingURL=index.js.map