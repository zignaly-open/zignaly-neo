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
import { Box } from '@mui/material';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdatePasswordMutation } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form } from './styles';
import { UpdatePasswordValidation } from './validations';
import { StyledErrorOutline } from '../../Auth/components/SignupForm/styles';
import PasswordVisibilityAdornment from '../../Auth/components/atoms/PasswordVisibilityAdornment';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useCheck2FA, useLogout } from 'apis/user/use';
import { useToast } from 'util/hooks/useToast';
var UpdatePasswordForm = function (_a) {
    var close = _a.close;
    var t = useTranslation('settings').t;
    var _b = useForm({
        mode: 'onChange',
        resolver: yupResolver(UpdatePasswordValidation),
    }), handleSubmit = _b.handleSubmit, control = _b.control, _c = _b.formState, errors = _c.errors, isValid = _c.isValid, setError = _b.setError;
    var _d = useUpdatePasswordMutation(), updatePassword = _d[0], updatePasswordStatus = _d[1];
    var _e = useState(false), showPassword = _e[0], setShowPassword = _e[1];
    var _f = useState(false), showNewPassword = _f[0], setShowNewPassword = _f[1];
    var check2FA = useCheck2FA({
        status: updatePasswordStatus,
    });
    var logout = useLogout(false);
    var toast = useToast();
    var onSubmit = function (data) {
        check2FA(function (code) {
            updatePassword(__assign(__assign({}, data), { code: code }))
                .unwrap()
                .then(function () {
                toast.success(t('update-password.success'));
                logout();
                close();
            })
                .catch(function (e) {
                var _a;
                if (((_a = e.data.error) === null || _a === void 0 ? void 0 : _a.code) === 7) {
                    setError('password', {
                        type: 'notMatch',
                        message: t("error:error.".concat(e.data.error.code)),
                    });
                }
            });
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, { whiteSpace: 'pre-line' }, t('update-password.description'))),
        React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
            React.createElement(Controller, { name: 'password', control: control, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ label: t('update-password.current-password'), placeholder: t('update-password.current-password'), error: t((_b = errors.password) === null || _b === void 0 ? void 0 : _b.message), type: showPassword ? 'text' : 'password', InputProps: {
                            endAdornment: (React.createElement(PasswordVisibilityAdornment, { show: showPassword, onToggle: function () { return setShowPassword(!showPassword); } })),
                        } }, field)));
                } }),
            React.createElement(Controller, { name: 'newPassword', control: control, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ label: t('update-password.new-password'), placeholder: t('update-password.new-password'), error: t((_b = errors.newPassword) === null || _b === void 0 ? void 0 : _b.message), helperText: React.createElement(Box, { display: 'flex', alignItems: 'center' },
                            React.createElement(StyledErrorOutline, { height: '24px', width: '24px' }),
                            React.createElement(ZigTypography, { variant: 'body2', color: 'neutral200' }, t('error:error.password-requirements', {
                                length: 8,
                            }))), type: showNewPassword ? 'text' : 'password', InputProps: {
                            endAdornment: (React.createElement(PasswordVisibilityAdornment, { show: showNewPassword, onToggle: function () { return setShowNewPassword(!showNewPassword); } })),
                        } }, field)));
                } }),
            React.createElement(ModalActionsNew, { align: 'right' },
                React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large', id: 'update-password__cancel' }, t('action:cancel')),
                React.createElement(ZigButton, { id: 'update-password__submit', type: 'submit', variant: 'contained', size: 'large', loading: updatePasswordStatus.isLoading, disabled: !isValid }, t('update-password.title'))))));
};
export default UpdatePasswordForm;
//# sourceMappingURL=UpdatePasswordForm.js.map