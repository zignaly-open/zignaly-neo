import React, { useMemo } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
} from '../../routes';
import { popMissedDestinationUrl } from '../navigation';
import { usePrevious } from 'react-use';

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();

  const redirectPath = useMemo(() => {
    if (isAuthenticated) {
      // the problem is that this component gets rendered twice and we call the missed destination url function twice too
      return (
        popMissedDestinationUrl() ||
        (pathname === ROUTE_SIGNUP ? ROUTE_PROFIT_SHARING : ROUTE_DASHBOARD)
      );
    } else {
      return null;
    }
  }, [isAuthenticated, pathname]);

  const prevIsAuthenticated = usePrevious(isAuthenticated);
  const prevPath = usePrevious(pathname);
  // this means that a redirect happened between children of this Wall
  // and the user is authenticated
  const isRedirectLoop =
    prevPath !== pathname && prevIsAuthenticated && isAuthenticated;

  return isAuthenticated ? (
    <Navigate
      to={isRedirectLoop ? ROUTE_PROFIT_SHARING : redirectPath}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default UnauthenticatedWall;
