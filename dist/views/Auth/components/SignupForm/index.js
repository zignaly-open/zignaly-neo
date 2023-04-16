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
import { Trans, useTranslation } from 'react-i18next';
import { Form, Action, TitleHead, StyledErrorOutline, Wrapper, LineBox, ColouredLine, } from './styles';
import { SignupValidation } from './validations';
import { useSignup } from '../../../../apis/user/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../../../routes';
import { ErrorMessage, TextButton, Typography, ZigButton, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { Box, InputAdornment, Link } from '@mui/material';
import Cookies from 'js-cookie';
import Mailcheck from 'react-mailcheck';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import LockIcon from '@mui/icons-material/Lock';
import PasswordVisibilityAdornment from '../atoms/PasswordVisibilityAdornment';
var SignupForm = function () {
    var t = useTranslation(['auth', 'error']).t;
    var _a = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(SignupValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    }), handleSubmit = _a.handleSubmit, control = _a.control, errors = _a.formState.errors;
    var _b = useSignup(), signingUp = _b[0].loading, signup = _b[1];
    var navigate = useNavigate();
    var _c = useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = useState(''), email = _d[0], setEmail = _d[1];
    var locationState = useLocation().state;
    var onSubmit = function (payload) {
        signup(__assign(__assign({}, payload), { ref: Cookies.get('ref'), subtrack: Cookies.get('subtrack') }));
    };
    return (React.createElement(Wrapper, null,
        React.createElement(LineBox, null,
            React.createElement(ColouredLine, null),
            React.createElement(Box, { flex: 1, height: '100%' })),
        React.createElement(Box, { padding: '0 32px' },
            React.createElement(TitleHead, null,
                React.createElement(ZigTypography, { variant: 'h1', fontWeight: 700 }, t('signup-title'))),
            React.createElement(TitleHead, null,
                React.createElement(ZigTypography, { variant: 'h2' },
                    React.createElement(Trans, { i18nKey: 'signup-description', t: t },
                        React.createElement(Link, { underline: 'always', sx: {
                                color: 'neutral000',
                                textUnderlineOffset: '10px',
                                textDecorationColor: '#E1E9F0',
                            } })))),
            React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
                React.createElement(Mailcheck, { email: email }, function (suggested) { return (React.createElement(Controller, { name: 'email', control: control, rules: { required: true }, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ id: 'signup', label: t('login-form.inputText.email.label') + ':', placeholder: t('login-form.inputText.email.label'), disabled: signingUp, error: t((_b = errors.email) === null || _b === void 0 ? void 0 : _b.message), helperText: suggested ? (React.createElement(ErrorMessage, { text: t('error:error.did-you-mean', {
                                    suggested: suggested.full,
                                }) })) : null }, field, { onBlur: function (e) {
                                field.onBlur();
                                setEmail(e.target.value);
                            }, InputProps: {
                                startAdornment: (React.createElement(InputAdornment, { position: 'start', sx: { marginRight: '10px', marginLeft: '-10px' } },
                                    React.createElement(EmailOutlinedIcon, { color: 'secondary' }))),
                            } })));
                    } })); }),
                React.createElement(Controller, { name: 'password', control: control, rules: { required: true }, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ id: 'login__password', label: t('login-form.inputText.password.label') + ':', placeholder: t('login-form.inputText.password.label'), disabled: signingUp, error: t((_b = errors.password) === null || _b === void 0 ? void 0 : _b.message), helperText: React.createElement(Box, { display: 'flex', alignItems: 'center' },
                                React.createElement(StyledErrorOutline, { height: '24px', width: '24px' }),
                                React.createElement(Typography, { variant: 'body2', color: 'neutral200', weight: 'regular' }, t('error:error.password-requirements', {
                                    length: 8,
                                }))), type: showPassword ? 'text' : 'password', InputProps: {
                                startAdornment: (React.createElement(InputAdornment, { position: 'start', sx: { marginRight: '10px', marginLeft: '-10px' } },
                                    React.createElement(PasswordOutlinedIcon, { color: 'secondary' }))),
                                endAdornment: (React.createElement(PasswordVisibilityAdornment, { show: showPassword, onToggle: function () { return setShowPassword(!showPassword); } })),
                            } }, field)));
                    } }),
                React.createElement(Typography, { marginTop: 3, variant: 'h4', color: 'neutral300', component: 'h4' },
                    React.createElement(Trans, { i18nKey: 'signup-form.accept-terms', t: t },
                        React.createElement(Link, { href: 'https://zignaly.com/legal/terms', target: '_blank', rel: 'noopener' }),
                        React.createElement(Link, { href: 'https://zignaly.com/legal/privacy', target: '_blank', rel: 'noopener' }))),
                React.createElement(Action, null,
                    React.createElement(ZigButton, { type: 'submit', variant: 'contained', id: 'signup__submit', size: 'large', loading: signingUp, fullWidth: true, sx: { padding: '19px 0' } },
                        React.createElement(ZigTypography, { variant: 'h3', letterSpacing: 1.2, fontWeight: 600 }, t('signup-form.submit')))),
                React.createElement(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                    } },
                    React.createElement(LockIcon, { color: 'secondary', fontSize: 'small' }),
                    React.createElement(ZigTypography, { variant: 'h3', color: 'neutral300', textAlign: 'center', marginTop: '5px' }, t('signup-protect'))),
                React.createElement(TextButton, { id: 'signup__login', onClick: function () { return navigate(ROUTE_LOGIN, { state: locationState }); }, caption: t('signup-form.link.login') })))));
};
export default SignupForm;
//# sourceMappingURL=index.js.map