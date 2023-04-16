import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
import { InputCode, ZigTypography } from '@zignaly-open/ui';
function TwoFAForm(_a) {
    var onSubmit = _a.onSubmit, isLoading = _a.isLoading, clearOnError = _a.clearOnError, _b = _a.error, error = _b === void 0 ? null : _b;
    var t = useTranslation('auth').t;
    return (React.createElement(Layout, null,
        React.createElement(Field, null,
            React.createElement(ZigTypography, null, t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-description')),
            React.createElement(InputCode, { fields: 6, error: error, loading: isLoading, clearOnError: clearOnError, onComplete: onSubmit, autoFocus: true }))));
}
export default TwoFAForm;
//# sourceMappingURL=index.js.map