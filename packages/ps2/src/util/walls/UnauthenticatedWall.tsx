import React, { useCallback } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
} from '../../routes';
import { getMissedDestinationUrl } from '../navigation';

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();

  const redirectPath = useCallback(
    () =>
      getMissedDestinationUrl() ||
      (pathname === ROUTE_SIGNUP ? ROUTE_PROFIT_SHARING : ROUTE_DASHBOARD),
    [pathname],
  );

  return isAuthenticated ? (
    <Navigate to={redirectPath()} replace />
  ) : (
    <Outlet />
  );
};

export default UnauthenticatedWall;
