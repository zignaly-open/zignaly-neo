import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthenticatedWall from 'util/walls/AuthenticatedWall.tsx';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import ServiceOwnerWall from './util/walls/ServiceOwnerWall';

import {
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_LOGIN,
  ROUTE_MY_BALANCES,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
  ROUTE_TRADING_SERVICE,
  ROUTE_TRADING_SERVICE_API,
  ROUTE_TRADING_SERVICE_COINS,
  ROUTE_TRADING_SERVICE_INVESTORS,
  ROUTE_TRADING_SERVICE_MANAGE,
  ROUTE_TRADING_SERVICE_MANUAL,
  ROUTE_TRADING_SERVICE_POSITIONS,
  ROUTE_TRADING_SERVICE_EDIT,
  ROUTE_TRADING_SERVICE_SIGNALS,
  ROUTE_BECOME_TRADER,
  ROUTE_HELP_INVESTOR,
  ROUTE_404,
  ROUTE_WALLET,
  ROUTE_RESET_PASSWORD,
} from './routes';

const ProfitSharing = lazy(() => import('./views/ProfitSharing'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const Login = lazy(() => import('./views/Auth/Login'));
const Signup = lazy(() => import('./views/Auth/Signup'));
const ForgotPassword = lazy(() => import('./views/Auth/ForgotPassword'));
const MyBalances = lazy(() => import('./views/Balance'));
const Wallet = lazy(() => import('./views/Wallet'));
const Management = lazy(() => import('./views/TraderService/Management'));
const Investors = lazy(() => import('./views/TraderService/Investors'));
const BecomeTrader = lazy(() => import('./views/TraderService/BecomeTrader'));
const Positions = lazy(() => import('./views/TraderService/Positions'));
const Coins = lazy(() => import('./views/TraderService/Coins'));
const ServicePage = lazy(() => import('./views/TraderService/ServiceProfile'));
const ServiceApi = lazy(() => import('./views/TraderService/ServiceApi'));
const Manual = lazy(() => import('views/TraderService/Manual'));
const Signals = lazy(() => import('./views/TraderService/Signals'));
const EditService = lazy(() => import('views/TraderService/EditService'));
const HelpInvestor = lazy(() => import('./views/Help/HelpInvestor'));
const NotFound = lazy(() => import('views/404'));
const ResetPassword = lazy(() => import('views/Auth/ResetPassword'));

const Router: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<AuthenticatedWall />}>
        <Route path={ROUTE_DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTE_MY_BALANCES} element={<MyBalances />} />
        <Route path={ROUTE_WALLET} element={<Wallet />} />
      </Route>

      <Route path={ROUTE_TRADING_SERVICE}>
        <Route index element={<ServicePage />} />
        <Route element={<ServiceOwnerWall />}>
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
          <Route path={ROUTE_TRADING_SERVICE_EDIT} element={<EditService />} />
        </Route>
      </Route>

      <Route path={ROUTE_BECOME_TRADER} element={<BecomeTrader />} />
      <Route path={ROUTE_HELP_INVESTOR} element={<HelpInvestor />} />

      <Route element={<UnauthenticatedWall />}>
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route path={ROUTE_SIGNUP} element={<Signup />} />
        <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE_RESET_PASSWORD} element={<ResetPassword />} />
      </Route>

      <Route path={ROUTE_PROFIT_SHARING} element={<ProfitSharing />} />
      <Route path={ROUTE_404} element={<NotFound />} />

      <Route
        path='/'
        element={<Navigate to={ROUTE_PROFIT_SHARING} replace />}
      />
      <Route path='*' element={<Navigate to={ROUTE_404} replace />} />
    </Routes>
  </Suspense>
);

export default Router;
