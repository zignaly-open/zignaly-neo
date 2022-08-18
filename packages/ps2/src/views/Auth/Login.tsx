import React from 'react';
import CenteredContainer from '../../components/CenteredContainer';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <CenteredContainer>
      <LoginForm />
    </CenteredContainer>
  );
};

export default Login;
