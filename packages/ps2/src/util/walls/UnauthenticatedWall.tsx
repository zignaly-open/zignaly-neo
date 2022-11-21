import React, { useCallback } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../routes';

type RedirectLocationState = {
  redirectTo: Location;
};

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname, state: locationState } = useLocation();

  const redirectPath = useCallback(() => {
    if (locationState) {
      const { redirectTo } = locationState as RedirectLocationState;
      return `${redirectTo.pathname}${redirectTo.search}`;
    } else {
      return pathname === 'signup' ? ROUTE_PROFIT_SHARING : ROUTE_DASHBOARD;
    }
  }, [locationState]);

  return isAuthenticated ? (
    <Navigate to={redirectPath()} replace />
  ) : (
    <Outlet />
  );
};

export default UnauthenticatedWall;
