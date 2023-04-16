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
import React, { useCallback, useEffect, useMemo } from 'react';
import EmailVerifyForm from '../EmailVerifyForm';
import TwoFAForm from '../TwoFAForm';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Container, Title } from './styles';
import { useResendKnownDeviceCode, useVerify2FA, useResendCode, useVerifyEmail, useVerifyEmailKnownDevice, useVerifyEmailNewUser, useResendCodeNewUser, } from '../../../../apis/user/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from '../../../../components/ZModal';
function AuthVerifyModal(_a) {
    var user = _a.user, close = _a.close, onSuccess = _a.onSuccess, onFailure = _a.onFailure, props = __rest(_a, ["user", "close", "onSuccess", "onFailure"]);
    var t = useTranslation(['auth', 'error']).t;
    var ask2FA = user.ask2FA, disabled = user.disabled, emailUnconfirmed = user.emailUnconfirmed, isUnknownDevice = user.isUnknownDevice;
    var resendEmail = useResendCode();
    var resendEmailNewUser = useResendCodeNewUser();
    var resendDevice = useResendKnownDeviceCode();
    var verifyEmail = useVerifyEmail();
    var verifyEmailNewUser = useVerifyEmailNewUser();
    var verifyDevice = useVerifyEmailKnownDevice();
    var _b = useVerify2FA(), submit2FA = _b[0], status2FA = _b[1];
    var toast = useToast();
    var verify = verifyEmailNewUser[0], verifyStatus = verifyEmailNewUser[1];
    var resend = resendEmailNewUser[0], resendStatus = resendEmailNewUser[1];
    if (!emailUnconfirmed && isUnknownDevice) {
        verify = verifyDevice[0], verifyStatus = verifyDevice[1];
        resend = resendDevice[0], resendStatus = resendDevice[1];
    }
    else if (disabled) {
        verify = verifyEmail[0], verifyStatus = verifyEmail[1];
        resend = resendEmail[0], resendStatus = resendEmail[1];
    }
    var performResend = function () {
        resend().then(function () { return toast.success(t('auth:resend-code')); });
    };
    var texts = useMemo(function () {
        var title = '';
        var description = '';
        if (disabled) {
            if (!verifyStatus.isSuccess) {
                title = t('auth-verify-modal.isDisabled.isNotVerifyEmailValid.title');
                description = t('auth-verify-modal.isDisabled.isNotVerifyEmailValid.description');
            }
        }
        else if (ask2FA) {
            if (verifyStatus.isSuccess) {
            }
            else if (isUnknownDevice) {
                title = t('auth-verify-modal.isNotDisabled.ask2FA.isUnknownDevice-title');
            }
            else {
                title = t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-title');
            }
        }
        else {
            if (emailUnconfirmed) {
                title = t('auth-verify-modal.isNotDisabled.askNot2FA.isEmailUnconfirmed.title');
                description = t('auth-verify-modal.isNotDisabled.askNot2FA.isEmailUnconfirmed.description');
            }
            else if (isUnknownDevice) {
                title = t('auth-verify-modal.isNotDisabled.askNot2FA.isUnknownDevice-title');
            }
        }
        return { title: title, description: description };
    }, [user, t, verifyStatus.isSuccess]);
    var getError = useCallback(function (status) {
        var _a, _b, _c;
        var errorCode = (_c = (_b = (_a = status === null || status === void 0 ? void 0 : status.error) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.code;
        return errorCode === 13
            ? t('error:error.login-session-expired')
            : [37, 108].includes(errorCode)
                ? t('error:error.wrong-code')
                : null;
    }, [t]);
    var onClickClose = function () {
        onFailure({ message: t('error:error.failed-verification') });
        close();
    };
    var allGood = (!ask2FA || status2FA.isSuccess) &&
        (!(isUnknownDevice || disabled || emailUnconfirmed) ||
            verifyStatus.isSuccess);
    useEffect(function () {
        if (allGood) {
            onSuccess();
            close();
        }
    }, [allGood]);
    return (React.createElement(ZModal, __assign({}, props, { close: emailUnconfirmed ? null : onClickClose, title: texts.title, titleAlign: 'center' }),
        React.createElement(Title, null, texts.description && (React.createElement(ZigTypography, null, texts.description))),
        React.createElement(Container, null,
            (isUnknownDevice || disabled || emailUnconfirmed) &&
                !verifyStatus.isSuccess && (React.createElement(EmailVerifyForm, { clearOnError: true, onSubmit: function (code) { return verify({ code: code }); }, onReSendCode: performResend, error: getError(verifyStatus), isReSendLoading: resendStatus.isLoading, isLoading: verifyStatus.isLoading })),
            ask2FA && !status2FA.isSuccess && (React.createElement(TwoFAForm, { clearOnError: true, onSubmit: function (code) { return submit2FA({ code: code }); }, isLoading: status2FA.isLoading, error: getError(status2FA) })))));
}
export default AuthVerifyModal;
//# sourceMappingURL=index.js.map