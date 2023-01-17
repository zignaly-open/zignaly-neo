import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfitSharing from './views/ProfitSharing';
import Dashboard from './views/Dashboard';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import ForgotPassword from './views/Auth/ForgotPassword';
import MyBalances from './views/Balance';
import Wallet from './views/Wallet';

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
  ROUTE_HELP_TRADER,
  ROUTE_HELP_INVESTOR,
  ROUTE_404,
  ROUTE_WALLET,
} from './routes';

import Management from './views/TraderService/Management';
import Investors from './views/TraderService/Investors';
import Positions from './views/TraderService/Positions';
import Coins from './views/TraderService/Coins';
import ServiceProfile from './views/TraderService/ServiceProfile';
import ServiceApi from './views/TraderService/ServiceApi';
import Manual from 'views/TraderService/Manual';
import Signals from './views/TraderService/Signals';
import EditService from 'views/TraderService/EditService';
import AuthenticatedWall from 'util/walls/AuthenticatedWall.tsx';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import ServiceOwnerWall from './util/walls/ServiceOwnerWall';
import HelpInvestor from './views/Help/HelpInvestor';
import HelpTrader from './views/Help/HelpTrader';
import NotFound from 'views/404';
import OfferYourTradingService from './views/OfferYourTradingService';

const Router: React.FC = () => (
  <Routes>
    <Route element={<AuthenticatedWall />}>
      <Route path={ROUTE_DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTE_MY_BALANCES} element={<MyBalances />} />
      <Route path={ROUTE_WALLET} element={<Wallet />} />
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

    <Route path={ROUTE_HELP_TRADER} element={<HelpTrader />} />
    <Route path={ROUTE_HELP_INVESTOR} element={<HelpInvestor />} />

    <Route element={<UnauthenticatedWall />}>
      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={ROUTE_SIGNUP} element={<Signup />} />
      <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
    </Route>

    <Route path={ROUTE_BECOME_TRADER} element={<OfferYourTradingService />} />
    <Route path={ROUTE_PROFIT_SHARING} element={<ProfitSharing />} />
    <Route path={ROUTE_404} element={<NotFound />} />

    <Route path='/' element={<Navigate to={ROUTE_PROFIT_SHARING} replace />} />
    <Route path='*' element={<Navigate to={ROUTE_404} replace />} />
  </Routes>
);

export default Router;
