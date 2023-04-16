import { PageContainer } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ResetPasswordForm from './components/ResetPasswordForm';
var ForgotPassword = function () {
    var t = useTranslation('pages').t;
    useTitle(t('reset-password'));
    return (React.createElement(PageContainer, { style: {
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } },
        React.createElement(ResetPasswordForm, null)));
};
export default ForgotPassword;
//# sourceMappingURL=ResetPassword.js.map