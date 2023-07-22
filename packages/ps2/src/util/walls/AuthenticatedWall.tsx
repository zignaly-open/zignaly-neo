import React, { useEffect } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes';
import { useCanLogIn } from './util';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const checkCanLogin = useCanLogIn();
  const location = useLocation();

  useEffect(() => {
    isAuthenticated && checkCanLogin();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_LOGIN} replace state={{ redirectTo: location }} />
  );
};

export default AuthenticatedWall;
