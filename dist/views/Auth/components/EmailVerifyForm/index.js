import React from 'react';
import { InputCode, TextButton, Typography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
function EmailVerifyForm(_a) {
    var onSubmit = _a.onSubmit, onReSendCode = _a.onReSendCode, clearOnError = _a.clearOnError, isLoading = _a.isLoading, _b = _a.error, error = _b === void 0 ? null : _b, _c = _a.isReSendLoading, isReSendLoading = _c === void 0 ? false : _c;
    var t = useTranslation('auth').t;
    return (React.createElement(Layout, null,
        React.createElement(Field, null,
            React.createElement(Typography, { variant: 'body1' }, t('login-form.verifyEmail.title')),
            React.createElement(InputCode, { fields: 6, error: error, loading: isLoading, clearOnError: clearOnError, onComplete: onSubmit, autoFocus: false }),
            React.createElement(TextButton, { onClick: onReSendCode, caption: t('login-form.verifyEmail.button'), loading: isReSendLoading }))));
}
export default EmailVerifyForm;
//# sourceMappingURL=index.js.map