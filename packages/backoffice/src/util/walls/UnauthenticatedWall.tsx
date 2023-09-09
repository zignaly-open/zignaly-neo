import React from 'react';
import { useIsAuthenticated } from '../../apis/session/use';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE_USERS } from '../../routes';

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Navigate to={ROUTE_USERS} replace /> : <Outlet />;
};

export default UnauthenticatedWall;
