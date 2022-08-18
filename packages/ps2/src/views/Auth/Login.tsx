import React from 'react';
import CenteredContainer from '../../components/CenteredContainer';
import LoginForm from '../../features/auth/components/LoginForm';

const Login: React.FC = () => {
  return (
    <CenteredContainer>
      <LoginForm />
    </CenteredContainer>
  );
};

export default Login;
