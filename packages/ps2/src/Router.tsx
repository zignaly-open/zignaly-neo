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
import Zigpad from './views/Zigpad';
import {
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HELP,
  ROUTE_LOGIN,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
  ROUTE_STAKING,
  ROUTE_TRADING_SERVICE,
  ROUTE_TRADING_SERVICE_API,
  ROUTE_TRADING_SERVICE_COINS,
  ROUTE_TRADING_SERVICE_INVESTORS,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_TRADING_SERVICE_MANUAL,
  ROUTE_TRADING_SERVICE_POSITIONS,
  ROUTE_TRADING_SERVICE_PROFILE,
  ROUTE_TRADING_SERVICE_PROFILE_EDIT,
  ROUTE_TRADING_SERVICE_SIGNALS,
  ROUTE_ZIGPAD,
} from './routes';

import { useIsAuthenticated } from './features/auth/use';
import TradingServicesInfo from './views/TradignService';
import Management from './views/TradignService/Management';
import Investors from './views/TradignService/Investors';
import Positions from './views/TradignService/Positions';
import Coins from './views/TradignService/Coins';
import ServiceProfile from './views/TradignService/ServiceProfile';
import ServiceApi from './views/TradignService/ServiceApi';
import Manual from 'views/TradignService/Manual';
import Signals from './views/TradignService/Signals';
import EditServiceProfile from 'views/TradignService/EditServiceProfile';

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

        <Route path={ROUTE_PROFIT_SHARING}>
          <Route index element={<ProfitSharing />} />
        </Route>
        <Route path={ROUTE_STAKING}>
          <Route index element={<Staking />} />
        </Route>
        <Route path={ROUTE_ZIGPAD}>
          <Route index element={<Zigpad />} />
        </Route>

        <Route path={ROUTE_HELP} element={<TradingServices />} />

        {/* TODO: wall */}
        <Route path={ROUTE_TRADING_SERVICE}>
          <Route index element={<TradingServicesInfo />} />
          <Route path={ROUTE_TRADING_SERVICE_MANAGE} element={<Management />} />
          <Route
            path={ROUTE_TRADING_SERVICE_INVESTORS}
            element={<Investors />}
          />
          <Route
            path={ROUTE_TRADING_SERVICE_POSITIONS}
            element={<Positions />}
          />
          <Route path={ROUTE_TRADING_SERVICE_COINS} element={<Coins />} />
          <Route path={ROUTE_TRADING_SERVICE_MANUAL} element={<Manual />} />
          <Route path={ROUTE_TRADING_SERVICE_API} element={<ServiceApi />} />
          <Route path={ROUTE_TRADING_SERVICE_SIGNALS} element={<Signals />} />
          <Route
            path={ROUTE_TRADING_SERVICE_PROFILE}
            element={<ServiceProfile />}
          />
          <Route
            path={ROUTE_TRADING_SERVICE_PROFILE_EDIT}
            element={<EditServiceProfile />}
          />
        </Route>

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
