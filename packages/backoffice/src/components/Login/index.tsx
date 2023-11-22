import React from 'react';
import LoginForm from './LoginForm';
import { PageContainer } from '@zignaly-open/ui';

const Login: React.FC = () => {
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
