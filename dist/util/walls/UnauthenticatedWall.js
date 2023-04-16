import React, { useCallback } from 'react';
import { useIsAuthenticated } from '../../apis/user/use';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../routes';
var UnauthenticatedWall = function () {
    var isAuthenticated = useIsAuthenticated();
    var _a = useLocation(), pathname = _a.pathname, locationState = _a.state;
    var redirectPath = useCallback(function () {
        if (locationState) {
            var redirectTo = locationState.redirectTo;
            return "".concat(redirectTo.pathname).concat(redirectTo.search);
        }
        else {
            return pathname === '/signup' ? ROUTE_PROFIT_SHARING : ROUTE_DASHBOARD;
        }
    }, [locationState]);
    return isAuthenticated ? (React.createElement(Navigate, { to: redirectPath(), replace: true })) : (React.createElement(Outlet, null));
};
export default UnauthenticatedWall;
//# sourceMappingURL=UnauthenticatedWall.js.map