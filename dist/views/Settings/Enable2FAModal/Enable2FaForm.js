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
import { Box, Link } from '@mui/material';
import { IconButton, ZigButton, ZigInput, ZigTypography, } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEnable2FAMutation, useLazyEnable2FAInfoQuery } from 'apis/user/api';
import { useForm, Controller } from 'react-hook-form';
import { Form, QRCode } from './styles';
import { TwoFAValidation } from './validations';
import { ModalActionsNew } from 'components/ZModal/ModalContainer/styles';
import { useToast } from 'util/hooks/useToast';
import { useLogout } from 'apis/user/use';
import { DOWNLOAD_GOOGLE_AUTHENTICATOR_URL, HELP_CREATE_ENABLE_2FA_URL, } from 'util/constants';
import copy from 'copy-to-clipboard';
import { ContentCopy } from '@mui/icons-material';
var Enable2FAForm = function (_a) {
    var close = _a.close;
    var t = useTranslation('settings').t;
    var _b = useForm({
        mode: 'onChange',
        resolver: yupResolver(TwoFAValidation),
    }), handleSubmit = _b.handleSubmit, control = _b.control, _c = _b.formState, errors = _c.errors, isValid = _c.isValid, setError = _b.setError;
    var _d = useLazyEnable2FAInfoQuery(), load2FAInfo = _d[0], load2FAInfoResult = _d[1];
    var _e = useEnable2FAMutation(), enable2FA = _e[0], enable2FAStatus = _e[1];
    var toast = useToast();
    var logout = useLogout(false);
    var onSubmit = function (data) {
        enable2FA(data)
            .unwrap()
            .then(function () {
            toast.success(t('enable-2fa.success'));
            logout();
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
    if (!load2FAInfoResult.isFetching && load2FAInfoResult.data) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Box, { mt: 1, mb: '20px' },
                React.createElement(ZigTypography, { whiteSpace: 'pre-line' },
                    React.createElement(Trans, { i18nKey: 'enable-2fa.setup-description', t: t },
                        React.createElement(Link, { href: DOWNLOAD_GOOGLE_AUTHENTICATOR_URL, target: '_blank', rel: 'noopener' })))),
            React.createElement(QRCode, { "aria-labelledby": 'QR Code', src: load2FAInfoResult.data[1] }),
            React.createElement(ZigTypography, { color: 'yellow', mt: 5, mb: 3 }, t('enable-2fa.key-phrase-info')),
            React.createElement(ZigInput, { label: t('enable-2fa.key-phrase'), type: 'text', value: load2FAInfoResult.data[0], InputProps: {
                    endAdornment: (React.createElement(IconButton, { "aria-label": 'Toggle password visibility', onClick: function () {
                            copy(load2FAInfoResult.data[0]);
                            toast.success(t('enable-2fa.key-phrase-copied'));
                        }, icon: React.createElement(ContentCopy, { sx: { color: 'neutral200' } }), variant: 'flat' })),
                } }),
            React.createElement(Form, { onSubmit: handleSubmit(onSubmit) },
                React.createElement(Controller, { name: 'code', control: control, render: function (_a) {
                        var _b;
                        var field = _a.field;
                        return (React.createElement(ZigInput, __assign({ label: React.createElement("div", null,
                                t('enable-2fa.enter-code'),
                                React.createElement(ZigTypography, { variant: 'h4', color: 'neutral400' }, t('enable-2fa.enter-code-subtitle'))), placeholder: t('enable-2fa.code-2fa'), error: t((_b = errors.code) === null || _b === void 0 ? void 0 : _b.message), type: 'text' }, field)));
                    } }),
                React.createElement(ModalActionsNew, { align: 'right' },
                    React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large', id: 'enable-2fa__cancel' }, t('action:cancel')),
                    React.createElement(ZigButton, { id: 'enable-2fa__submit', type: 'submit', variant: 'contained', size: 'large', loading: enable2FAStatus.isLoading, disabled: !isValid }, t('enable-2fa.enable-2fa'))))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { mt: 1, mb: 1 },
            React.createElement(ZigTypography, { whiteSpace: 'pre-line' },
                React.createElement(Trans, { i18nKey: 'enable-2fa.description', t: t },
                    React.createElement(Link, { href: HELP_CREATE_ENABLE_2FA_URL, target: '_blank', rel: 'noopener' })))),
        React.createElement(ModalActionsNew, { align: 'right' },
            React.createElement(ZigButton, { onClick: close, variant: 'outlined', size: 'large', id: 'enable-2fa__setup-cancel' }, t('action:cancel')),
            React.createElement(ZigButton, { onClick: function () { return load2FAInfo(); }, loading: load2FAInfoResult.isLoading || load2FAInfoResult.isFetching, variant: 'contained', size: 'large', id: 'enable-2fa__setup' }, t('enable-2fa.setup-2fa')))));
};
export default Enable2FAForm;
//# sourceMappingURL=Enable2FaForm.js.map