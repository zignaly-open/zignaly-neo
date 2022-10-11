import React from 'react';
import { useIsAuthenticated, usePopMissedRoute } from '../../apis/user/use';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_DASHBOARD } from '../../routes';

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const popMissedRoute = usePopMissedRoute();

  return isAuthenticated ? (
    <Navigate to={popMissedRoute() || ROUTE_DASHBOARD} replace />
  ) : (
    <Outlet />
  );
};

export default UnauthenticatedWall;
