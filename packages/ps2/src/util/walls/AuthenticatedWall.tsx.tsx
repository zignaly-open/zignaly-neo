import React from 'react';
import { useIsAuthenticated } from '../../features/user/use';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_LOGIN} replace />;
};

export default AuthenticatedWall;
