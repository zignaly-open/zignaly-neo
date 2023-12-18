import React, { lazy, Suspense } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom';
import { lazily } from 'react-lazily';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import ServiceOwnerWall from './util/walls/ServiceOwnerWall';
import * as Routes from './routes';

// views we load unconditionally
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import SignupPlain from './views/Auth/SignupPlain';
import ServiceHeader from './views/TraderService/components/ServiceHeader';
import { zigSuspenseFallback } from 'util/suspense';
import { isFeatureOn } from './whitelabel';
import { Features } from './whitelabel/type';

const ProfitSharing = lazy(() => import('./views/ProfitSharing'));
const ForgotPassword = lazy(() => import('./views/Auth/ForgotPassword'));
const HelpInvestor = lazy(() => import('./views/Help/HelpInvestor'));
const NotFound = lazy(() => import('views/404'));
const ResetPassword = lazy(() => import('views/Auth/ResetPassword'));
const Referrals = lazy(() => import('./views/Referrals'));
const Invite = lazy(() => import('./views/Referrals/Invite'));
const Rewards = lazy(() => import('./views/Rewards'));
const Subscriptions = lazy(() => import('./views/Subscriptions'));

const { default: Dashboard, DashboardModalInvestmentEdit } = lazily(
  () => import('./views/Dashboard'),
);

const {
  Management,
  Investors,
  BecomeTrader,
  Positions,
  Coins,
  ServiceApi,
  Signals,
  EditService,
  Manual,
} = lazily(() => import('./views/TraderService/routes'));

const { Kyc, SettingsHeader, UpdatePassword, Toggle2FA, EditProfile } = lazily(
  () => import('./views/Settings/routes'),
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
    <Suspense fallback={zigSuspenseFallback}>
      <Outlet />
    </Suspense>
  </>
);

const Router: React.FC = () => {
  return (
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
        <Route
          path={Routes.ROUTE_MY_BALANCES}
          element={outleted(<MyBalances />)}
        >
          <Route
            path={Routes.ROUTE_MY_BALANCES_DEPOSIT}
            element={<MyBalancesDeposit bgRoute={Routes.ROUTE_MY_BALANCES} />}
          />
          <Route
            path={Routes.ROUTE_MY_BALANCES_DEPOSIT_COIN}
            element={<MyBalancesDeposit bgRoute={Routes.ROUTE_MY_BALANCES} />}
          />
        </Route>
        <Route
          path={Routes.ROUTE_MY_BALANCES_TRANSACTIONS}
          element={outleted(<MyBalances />)}
        />
        {isFeatureOn(Features.Subscriptions) && (
          <Route
            path={Routes.ROUTE_SUBSCRIPTIONS}
            element={<Subscriptions />}
          />
        )}
        {isFeatureOn(Features.Referrals) && (
          <Route path={Routes.ROUTE_REFERRALS} element={<Referrals />} />
        )}
        {isFeatureOn(Features.Rewards) && (
          <Route path={Routes.ROUTE_REWARDS} element={<Rewards />} />
        )}
      </Route>

      <Route element={outleted(<ServiceHeader />)}>
        <Route
          path={Routes.ROUTE_TRADING_SERVICE}
          element={outleted(<ServiceProfile />)}
        >
          <Route
            path={Routes.ROUTE_PROFIT_SHARING_SERVICE_INVEST}
            element={
              <ServiceProfileInvestment
                bgRoute={Routes.ROUTE_TRADING_SERVICE}
              />
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
          <Route
            path={Routes.ROUTE_TRADING_SERVICE_COINS}
            element={<Coins />}
          />
          <Route
            path={Routes.ROUTE_TRADING_SERVICE_MANUAL}
            element={<Manual />}
          />
          <Route
            path={Routes.ROUTE_TRADING_SERVICE_API}
            element={<ServiceApi />}
          />
          <Route
            path={Routes.ROUTE_TRADING_SERVICE_SIGNALS}
            element={<Signals />}
          />
          <Route
            path={Routes.ROUTE_TRADING_SERVICE_EDIT}
            element={<EditService />}
          />
        </Route>
      </Route>

      <Route element={outleted(<SettingsHeader />)}>
        <Route element={<AuthenticatedWall />}>
          {isFeatureOn(Features.Kyc) && (
            <Route path={Routes.ROUTE_KYC} element={<Kyc />} />
          )}
          <Route path={Routes.ROUTE_2FA} element={<Toggle2FA />} />
          <Route path={Routes.ROUTE_EDIT_PROFILE} element={<EditProfile />} />
          <Route path={Routes.ROUTE_PASSWORD} element={<UpdatePassword />} />
        </Route>
      </Route>

      {isFeatureOn(Features.Trader) && (
        <Route path={Routes.ROUTE_BECOME_TRADER} element={<BecomeTrader />} />
      )}

      <Route path={Routes.ROUTE_HELP_INVESTOR} element={<HelpInvestor />} />

      <Route element={<UnauthenticatedWall />}>
        <Route path={Routes.ROUTE_REFERRALS_INVITE} element={<Invite />} />
        <Route
          path={Routes.ROUTE_REFERRALS_INVITE_SHORT}
          element={<Invite />}
        />
        <Route path={Routes.ROUTE_LOGIN} element={<Login />} />
        {isFeatureOn(Features.Signup) && (
          <Route
            path={Routes.ROUTE_SIGNUP}
            element={
              isFeatureOn(Features.NewSignup) ? <Signup /> : <SignupPlain />
            }
          />
        )}
        <Route
          path={Routes.ROUTE_FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
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
};

export default Router;
