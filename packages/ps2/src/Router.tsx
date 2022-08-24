import React, { ReactElement } from 'react';
import Header from './features/navigation/Header';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import ProfitSharing from './views/ProfitSharing';
import Dashboard from './views/Dashboard';
import Staking from './views/Staking';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import ForgotPassword from './views/Auth/ForgotPassword';
import TradingServices from './views/Help/TradingServices';
import MyBalances from './views/MyBalances';
import {
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HELP,
  ROUTE_LOGIN,
  ROUTE_MY_BALANCES,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
  ROUTE_STAKING,
  ROUTE_ZIGPAD,
} from './routes';

import { useIsAuthenticated } from './features/auth/use';

const AuthenticatedWall: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to={ROUTE_LOGIN} replace />;
};

const UnauthenticatedWall: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Navigate to={ROUTE_DASHBOARD} replace /> : children;
};

function Router() {
  return (
    <>
      <Header />
      <RouterRoutes>
        <Route
          path={ROUTE_DASHBOARD}
          element={
            <AuthenticatedWall>
              <Dashboard />
            </AuthenticatedWall>
          }
        />

        <Route path={ROUTE_MY_BALANCES}>
          <Route index element={<MyBalances />} />
        </Route>

        <Route path={ROUTE_PROFIT_SHARING}>
          <Route index element={<ProfitSharing />} />
        </Route>
        <Route path={ROUTE_STAKING}>
          <Route index element={<Staking />} />
        </Route>
        <Route path={ROUTE_ZIGPAD}>
          <Route index element={<ProfitSharing />} />
        </Route>

        <Route path={ROUTE_HELP} element={<TradingServices />} />

        <Route
          path={ROUTE_LOGIN}
          element={
            <UnauthenticatedWall>
              <Login />
            </UnauthenticatedWall>
          }
        />
        <Route
          path={ROUTE_SIGNUP}
          element={
            <UnauthenticatedWall>
              <Signup />
            </UnauthenticatedWall>
          }
        />
        <Route
          path={ROUTE_FORGOT_PASSWORD}
          element={
            <UnauthenticatedWall>
              <ForgotPassword />
            </UnauthenticatedWall>
          }
        />
      </RouterRoutes>
    </>
  );
}

export default Router;
