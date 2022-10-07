import React from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_DASHBOARD } from '../../routes';

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? (
    <Navigate to={ROUTE_DASHBOARD} replace />
  ) : (
    <Outlet />
  );
};

export default UnauthenticatedWall;
