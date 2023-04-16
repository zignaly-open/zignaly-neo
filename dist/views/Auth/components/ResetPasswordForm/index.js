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
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, Action, TitleHead, StyledErrorOutline } from './styles';
import { ResetPasswordValidation } from './validations';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useResetPasswordMutation } from 'apis/user/api';
import { ROUTE_LOGIN } from 'routes';
import { useToast } from 'util/hooks/useToast';
import PasswordVisibilityAdornment from '../atoms/PasswordVisibilityAdornment';
var ResetPasswordForm = function () {
    var t = useTranslation(['auth', 'error']).t;
    var _a = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(ResetPasswordValidation),
        defaultValues: {
            password: '',
        },
    }), handleSubmit = _a.handleSubmit, control = _a.control, _b = _a.formState, errors = _b.errors, isValid = _b.isValid;
    var _c = useResetPasswordMutation(), resetPassword = _c[0], resetPasswordStatus = _c[1];
    var navigate = useNavigate();
    var _d = useState(false), showPassword = _d[0], setShowPassword = _d[1];
    var token = useParams().token;
    var toast = useToast();
    var onSubmit = function (_a) {
        var password = _a.password;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, resetPassword({
                            password: password,
                            token: token,
                        }).unwrap()];
                    case 1:
                        _b.sent();
                        toast.success(t('reset-password.reset-password-success'));
                        navigate(ROUTE_LOGIN);
                        return [2];
                }
            });
        });
    };
    return (React.createElement(Box, { sx: { width: '100%', p: 4, maxWidth: 500 } },
        React.createElement(TitleHead, null,
            React.createElement(ZigTypography, { variant: 'h2' }, t('reset-password.reset-password'))),
        React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
            React.createElement(Controller, { name: 'password', control: control, rules: { required: true }, render: function (_a) {
                    var _b;
                    var field = _a.field;
                    return (React.createElement(ZigInput, __assign({ label: t('reset-password.new-password'), placeholder: t('reset-password.new-password'), disabled: resetPasswordStatus.isLoading, error: t((_b = errors.password) === null || _b === void 0 ? void 0 : _b.message), helperText: React.createElement(Box, { display: 'flex', alignItems: 'center' },
                            React.createElement(StyledErrorOutline, { height: '24px', width: '24px' }),
                            React.createElement(ZigTypography, { variant: 'body2', color: 'neutral200' }, t('error:error.password-requirements', {
                                length: 8,
                            }))), type: showPassword ? 'text' : 'password', InputProps: {
                            endAdornment: (React.createElement(PasswordVisibilityAdornment, { show: showPassword, onToggle: function () { return setShowPassword(!showPassword); } })),
                        } }, field)));
                } }),
            React.createElement(Action, null,
                React.createElement(Button, { type: 'submit', variant: 'primary', caption: t('reset-password.reset-password'), size: 'xlarge', loading: resetPasswordStatus.isLoading, disabled: !isValid, id: 'resetpassword__submit' })))));
};
export default ResetPasswordForm;
//# sourceMappingURL=index.js.map