import { PageContainer } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ForgotPasswordForm from './components/ForgotPasswordForm';
var ForgotPassword = function () {
    var t = useTranslation('pages').t;
    useTitle(t('forgot-password'));
    return (React.createElement(PageContainer, { style: {
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } },
        React.createElement(ForgotPasswordForm, null)));
};
export default ForgotPassword;
//# sourceMappingURL=ForgotPassword.js.map