import React, { useEffect } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Outlet } from 'react-router-dom';
import { useCanLogIn } from './util';
import useMaybeNavigateNotLoggedIn from '../hooks/useMaybeNavigateNotLoggedIn';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const checkCanLogin = useCanLogIn();
  const navigateIfNotLoggedIn = useMaybeNavigateNotLoggedIn();

  useEffect(() => {
    isAuthenticated && checkCanLogin();
    navigateIfNotLoggedIn();
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
};

export default AuthenticatedWall;
