import React, { useEffect } from 'react';
import { useIsAuthenticated, useSetMissedRoute } from '../../apis/user/use';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const setMissedRoute = useSetMissedRoute();
  useEffect(() => !isAuthenticated && setMissedRoute(), []);

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_LOGIN} replace />;
};

export default AuthenticatedWall;
