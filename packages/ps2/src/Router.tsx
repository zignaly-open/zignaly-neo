import React, { lazy } from 'react';
import {
  Routes as RouterRoutes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { lazily } from 'react-lazily';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import ServiceOwnerWall from './util/walls/ServiceOwnerWall';
import * as Routes from './routes';

// views we load unconditionally
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';

const Wallet = lazy(() => import('./views/Wallet'));
const Manual = lazy(() => import('./views/TraderService/Manual'));
const ProfitSharing = lazy(() => import('./views/ProfitSharing'));
const ForgotPassword = lazy(() => import('./views/Auth/ForgotPassword'));
const Management = lazy(() => import('./views/TraderService/Management'));
const Investors = lazy(() => import('./views/TraderService/Investors'));
const BecomeTrader = lazy(() => import('./views/TraderService/BecomeTrader'));
const Positions = lazy(() => import('./views/TraderService/Positions'));
const Coins = lazy(() => import('./views/TraderService/Coins'));
const ServiceApi = lazy(() => import('./views/TraderService/ServiceApi'));
const Signals = lazy(() => import('./views/TraderService/Signals'));
const EditService = lazy(() => import('views/TraderService/EditService'));
const HelpInvestor = lazy(() => import('./views/Help/HelpInvestor'));
const NotFound = lazy(() => import('views/404'));
const ResetPassword = lazy(() => import('views/Auth/ResetPassword'));
const Referrals = lazy(() => import('./views/Referrals'));
const Invite = lazy(() => import('./views/Referrals/Invite'));
const Rewards = lazy(() => import('./views/Rewards'));

const { default: Dashboard, DashboardModalInvestmentEdit } = lazily(
  () => import('./views/Dashboard'),
);
const { default: MyBalances, MyBalancesDeposit } = lazily(
  () => import('./views/Balance'),
);
const { default: ServiceProfile, ServiceProfileInvestment } = lazily(
  () => import('./views/TraderService/ServiceProfile'),
);

const outleted = (Component: JSX.Element) => (
  <>
    {Component}
    <Outlet />
  </>
);

const Router: React.FC = () => (
  <RouterRoutes>
    <Route element={<AuthenticatedWall />}>
      <Route path={Routes.ROUTE_DASHBOARD} element={outleted(<Dashboard />)}>
        <Route
          path={Routes.ROUTE_DASHBOARD_EDIT_INVESTMENT}
          element={
            <DashboardModalInvestmentEdit bgRoute={Routes.ROUTE_DASHBOARD} />
          }
        />
      </Route>
      <Route path={Routes.ROUTE_MY_BALANCES} element={outleted(<MyBalances />)}>
        <Route
          path={Routes.ROUTE_MY_BALANCES_DEPOSIT}
          element={<MyBalancesDeposit bgRoute={Routes.ROUTE_MY_BALANCES} />}
        />
        <Route
          path={Routes.ROUTE_MY_BALANCES_DEPOSIT_COIN}
          element={<MyBalancesDeposit bgRoute={Routes.ROUTE_MY_BALANCES} />}
        />
      </Route>
      <Route path={Routes.ROUTE_WALLET} element={<Wallet />} />
      <Route path={Routes.ROUTE_REFERRALS} element={<Referrals />} />
      <Route path={Routes.ROUTE_REWARDS} element={<Rewards />} />
    </Route>

    <Route
      path={Routes.ROUTE_TRADING_SERVICE}
      element={outleted(<ServiceProfile />)}
    >
      <Route
        path={Routes.ROUTE_PROFIT_SHARING_SERVICE_INVEST}
        element={
          <ServiceProfileInvestment bgRoute={Routes.ROUTE_TRADING_SERVICE} />
        }
      />
    </Route>

    <Route element={<ServiceOwnerWall />}>
      <Route
        path={Routes.ROUTE_TRADING_SERVICE_MANAGE}
        element={<Management />}
      />
      <Route
        path={Routes.ROUTE_TRADING_SERVICE_INVESTORS}
        element={<Investors />}
      />
      <Route
        path={Routes.ROUTE_TRADING_SERVICE_POSITIONS}
        element={<Positions />}
      />
      <Route path={Routes.ROUTE_TRADING_SERVICE_COINS} element={<Coins />} />
      <Route path={Routes.ROUTE_TRADING_SERVICE_MANUAL} element={<Manual />} />
      <Route path={Routes.ROUTE_TRADING_SERVICE_API} element={<ServiceApi />} />
      <Route
        path={Routes.ROUTE_TRADING_SERVICE_SIGNALS}
        element={<Signals />}
      />
      <Route
        path={Routes.ROUTE_TRADING_SERVICE_EDIT}
        element={<EditService />}
      />
    </Route>

    <Route path={Routes.ROUTE_BECOME_TRADER} element={<BecomeTrader />} />
    <Route path={Routes.ROUTE_HELP_INVESTOR} element={<HelpInvestor />} />

    <Route element={<UnauthenticatedWall />}>
      <Route path={Routes.ROUTE_REFERRALS_INVITE} element={<Invite />} />
      <Route path={Routes.ROUTE_REFERRALS_INVITE_SHORT} element={<Invite />} />
      <Route path={Routes.ROUTE_LOGIN} element={<Login />} />
      <Route path={Routes.ROUTE_SIGNUP} element={<Signup />} />
      <Route path={Routes.ROUTE_FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={Routes.ROUTE_RESET_PASSWORD} element={<ResetPassword />} />
    </Route>

    <Route path={Routes.ROUTE_PROFIT_SHARING} element={<ProfitSharing />} />
    <Route path={Routes.ROUTE_404} element={<NotFound />} />

    <Route
      path='/'
      element={<Navigate to={Routes.ROUTE_PROFIT_SHARING} replace />}
    />
    <Route path='*' element={<Navigate to={Routes.ROUTE_404} replace />} />
  </RouterRoutes>
);

export default Router;
