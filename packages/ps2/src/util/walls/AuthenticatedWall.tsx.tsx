import React from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_SIGNUP } from '../../routes';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTE_SIGNUP} replace state={{ redirectTo: location }} />
  );
};

export default AuthenticatedWall;
