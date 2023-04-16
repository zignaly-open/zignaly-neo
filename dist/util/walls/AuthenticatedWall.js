import React from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes';
var AuthenticatedWall = function () {
    var isAuthenticated = useIsAuthenticated();
    var location = useLocation();
    return isAuthenticated ? (React.createElement(Outlet, null)) : (React.createElement(Navigate, { to: ROUTE_LOGIN, replace: true, state: { redirectTo: location } }));
};
export default AuthenticatedWall;
//# sourceMappingURL=AuthenticatedWall.js.map