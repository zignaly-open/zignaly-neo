import React from 'react';
import LoginForm from './components/LoginForm';
import { PageContainer } from '@zignaly-open/ui';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
var Login = function () {
    var t = useTranslation('pages').t;
    useTitle(t('login'));
    return (React.createElement(PageContainer, { style: {
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } },
        React.createElement(LoginForm, null)));
};
export default Login;
//# sourceMappingURL=Login.js.map