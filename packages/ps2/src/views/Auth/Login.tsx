import React from 'react';
import LoginForm from './components/LoginForm';
import { PageContainer } from '@zignaly-open/ui';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('login'));

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </PageContainer>
  );
};

export default Login;
