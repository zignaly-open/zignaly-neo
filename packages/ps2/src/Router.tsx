import React from 'react';
import Header from './features/navigation/Header';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  generatePath,
} from 'react-router-dom';
import ProfitSharing from './views/ProfitSharing';
import Dashboard from './views/Dashboard';
import Staking from './views/Staking';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import ForgotPassword from './views/Auth/ForgotPassword';
import TraderServices from './views/Help/TraderServices';
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
  ROUTE_TRADING_SERVICE_EDIT,
  ROUTE_TRADING_SERVICE_SIGNALS,
  ROUTE_ZIGPAD,
} from './routes';

import { useIsAuthenticated } from './features/auth/use';
import Management from './views/TraderService/Management';
import Investors from './views/TraderService/Investors';
import Positions from './views/TraderService/Positions';
import Coins from './views/TraderService/Coins';
import ServiceProfile from './views/TraderService/ServiceProfile';
import ServiceApi from './views/TraderService/ServiceApi';
import Manual from 'views/TraderService/Manual';
import Signals from './views/TraderService/Signals';
import EditService from 'views/TraderService/EditService';
import { useIsServiceOwner } from './features/trader/use';

const AuthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return <Outlet />;
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_LOGIN} replace />;
};

const UnauthenticatedWall: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? (
    <Navigate to={ROUTE_DASHBOARD} replace />
  ) : (
    <Outlet />
  );
};

const ServiceOwnerWall: React.FC = () => {
  const { serviceId } = useParams();
  const isOwner = useIsServiceOwner(serviceId);

  return !isOwner ? (
    <Navigate
      to={generatePath(ROUTE_TRADING_SERVICE, {
        serviceId,
      })}
      replace
    />
  ) : (
    <Outlet />
  );
};

const Router: React.FC = () => (
  <Routes>
    <Route element={<AuthenticatedWall />}>
      <Route path={ROUTE_DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTE_PROFIT_SHARING} element={<ProfitSharing />} />
      <Route path={ROUTE_STAKING} element={<Staking />} />
      <Route path={ROUTE_ZIGPAD} element={<Zigpad />} />
    </Route>

    <Route path={ROUTE_TRADING_SERVICE}>
      <Route index element={<ServiceProfile />} />

      <Route element={<ServiceOwnerWall />}>
        <Route path={ROUTE_TRADING_SERVICE_MANAGE} element={<Management />} />
        <Route path={ROUTE_TRADING_SERVICE_INVESTORS} element={<Investors />} />
        <Route path={ROUTE_TRADING_SERVICE_POSITIONS} element={<Positions />} />
        <Route path={ROUTE_TRADING_SERVICE_COINS} element={<Coins />} />
        <Route path={ROUTE_TRADING_SERVICE_MANUAL} element={<Manual />} />
        <Route path={ROUTE_TRADING_SERVICE_API} element={<ServiceApi />} />
        <Route path={ROUTE_TRADING_SERVICE_SIGNALS} element={<Signals />} />
        <Route path={ROUTE_TRADING_SERVICE_EDIT} element={<EditService />} />
      </Route>
    </Route>

    <Route path={ROUTE_HELP} element={<TraderServices />} />

    <Route element={<UnauthenticatedWall />}>
      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={ROUTE_SIGNUP} element={<Signup />} />
      <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
    </Route>
  </Routes>
);

export default () => (
  <>
    <Header />
    <Router />
  </>
);
