import React, { lazy } from 'react';
import { Routes as RouterRoutes, Route, Navigate, Outlet, } from 'react-router-dom';
import { lazily } from 'react-lazily';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import ServiceOwnerWall from './util/walls/ServiceOwnerWall';
import * as Routes from './routes';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
var Wallet = lazy(function () { return import('./views/Wallet'); });
var Manual = lazy(function () { return import('./views/TraderService/Manual'); });
var ProfitSharing = lazy(function () { return import('./views/ProfitSharing'); });
var ForgotPassword = lazy(function () { return import('./views/Auth/ForgotPassword'); });
var Management = lazy(function () { return import('./views/TraderService/Management'); });
var Investors = lazy(function () { return import('./views/TraderService/Investors'); });
var BecomeTrader = lazy(function () { return import('./views/TraderService/BecomeTrader'); });
var Positions = lazy(function () { return import('./views/TraderService/Positions'); });
var Coins = lazy(function () { return import('./views/TraderService/Coins'); });
var ServiceApi = lazy(function () { return import('./views/TraderService/ServiceApi'); });
var Signals = lazy(function () { return import('./views/TraderService/Signals'); });
var EditService = lazy(function () { return import('views/TraderService/EditService'); });
var HelpInvestor = lazy(function () { return import('./views/Help/HelpInvestor'); });
var NotFound = lazy(function () { return import('views/404'); });
var ResetPassword = lazy(function () { return import('views/Auth/ResetPassword'); });
var Referrals = lazy(function () { return import('./views/Referrals'); });
var Invite = lazy(function () { return import('./views/Referrals/Invite'); });
var Rewards = lazy(function () { return import('./views/Rewards'); });
var _a = lazily(function () { return import('./views/Dashboard'); }), Dashboard = _a.default, DashboardModalInvestmentEdit = _a.DashboardModalInvestmentEdit;
var _b = lazily(function () { return import('./views/Balance'); }), MyBalances = _b.default, MyBalancesDeposit = _b.MyBalancesDeposit;
var _c = lazily(function () { return import('./views/TraderService/ServiceProfile'); }), ServiceProfile = _c.default, ServiceProfileInvestment = _c.ServiceProfileInvestment;
var outleted = function (Component) { return (React.createElement(React.Fragment, null,
    Component,
    React.createElement(Outlet, null))); };
var Router = function () { return (React.createElement(RouterRoutes, null,
    React.createElement(Route, { element: React.createElement(AuthenticatedWall, null) },
        React.createElement(Route, { path: Routes.ROUTE_DASHBOARD, element: outleted(React.createElement(Dashboard, null)) },
            React.createElement(Route, { path: Routes.ROUTE_DASHBOARD_EDIT_INVESTMENT, element: React.createElement(DashboardModalInvestmentEdit, { bgRoute: Routes.ROUTE_DASHBOARD }) })),
        React.createElement(Route, { path: Routes.ROUTE_MY_BALANCES, element: outleted(React.createElement(MyBalances, null)) },
            React.createElement(Route, { path: Routes.ROUTE_MY_BALANCES_DEPOSIT, element: React.createElement(MyBalancesDeposit, { bgRoute: Routes.ROUTE_MY_BALANCES }) }),
            React.createElement(Route, { path: Routes.ROUTE_MY_BALANCES_DEPOSIT_COIN, element: React.createElement(MyBalancesDeposit, { bgRoute: Routes.ROUTE_MY_BALANCES }) })),
        React.createElement(Route, { path: Routes.ROUTE_WALLET, element: React.createElement(Wallet, null) }),
        React.createElement(Route, { path: Routes.ROUTE_REFERRALS, element: React.createElement(Referrals, null) }),
        React.createElement(Route, { path: Routes.ROUTE_REWARDS, element: React.createElement(Rewards, null) })),
    React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE, element: outleted(React.createElement(ServiceProfile, null)) },
        React.createElement(Route, { path: Routes.ROUTE_PROFIT_SHARING_SERVICE_INVEST, element: React.createElement(ServiceProfileInvestment, { bgRoute: Routes.ROUTE_TRADING_SERVICE }) })),
    React.createElement(Route, { element: React.createElement(ServiceOwnerWall, null) },
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_MANAGE, element: React.createElement(Management, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_INVESTORS, element: React.createElement(Investors, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_POSITIONS, element: React.createElement(Positions, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_COINS, element: React.createElement(Coins, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_MANUAL, element: React.createElement(Manual, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_API, element: React.createElement(ServiceApi, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_SIGNALS, element: React.createElement(Signals, null) }),
        React.createElement(Route, { path: Routes.ROUTE_TRADING_SERVICE_EDIT, element: React.createElement(EditService, null) })),
    React.createElement(Route, { path: Routes.ROUTE_BECOME_TRADER, element: React.createElement(BecomeTrader, null) }),
    React.createElement(Route, { path: Routes.ROUTE_HELP_INVESTOR, element: React.createElement(HelpInvestor, null) }),
    React.createElement(Route, { element: React.createElement(UnauthenticatedWall, null) },
        React.createElement(Route, { path: Routes.ROUTE_REFERRALS_INVITE, element: React.createElement(Invite, null) }),
        React.createElement(Route, { path: Routes.ROUTE_REFERRALS_INVITE_SHORT, element: React.createElement(Invite, null) }),
        React.createElement(Route, { path: Routes.ROUTE_LOGIN, element: React.createElement(Login, null) }),
        React.createElement(Route, { path: Routes.ROUTE_SIGNUP, element: React.createElement(Signup, null) }),
        React.createElement(Route, { path: Routes.ROUTE_FORGOT_PASSWORD, element: React.createElement(ForgotPassword, null) }),
        React.createElement(Route, { path: Routes.ROUTE_RESET_PASSWORD, element: React.createElement(ResetPassword, null) })),
    React.createElement(Route, { path: Routes.ROUTE_PROFIT_SHARING, element: React.createElement(ProfitSharing, null) }),
    React.createElement(Route, { path: Routes.ROUTE_404, element: React.createElement(NotFound, null) }),
    React.createElement(Route, { path: '/', element: React.createElement(Navigate, { to: Routes.ROUTE_PROFIT_SHARING, replace: true }) }),
    React.createElement(Route, { path: '*', element: React.createElement(Navigate, { to: Routes.ROUTE_404, replace: true }) }))); };
export default Router;
//# sourceMappingURL=Router.js.map