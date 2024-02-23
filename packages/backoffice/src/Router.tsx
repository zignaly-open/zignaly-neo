import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import Login from 'components/Login';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import * as Routes from './routes';
import Users from './components/Users';
import Withdrawals from './components/Transfers/Withdrawals';
import Deposits from './components/Transfers/Deposits';
import Logs from './components/Logs';
import ThemeConfig from './components/Config/ThemeConfig';
import SettingsConfig from 'components/Config/SettingsConfig';
import ProfileConfig from 'components/Config/ProfileConfig';
import CommunicationConfig from './components/Config/CommunicationConfig';
import WhitelabelConfigHeader from './components/Config/SubHeader';
import WhitelabelConfigLoader from './components/Config/WhitelabelConfigLoader';
import RedirectToFirstWlConfig from './components/Config/RedirectToFirstWlConfig';

const Router: React.FC = () => (
  <RouterRoutes>
    <Route element={<AuthenticatedWall />}>
      <Route path={Routes.ROUTE_USERS} element={<Users />} />
      <Route path={Routes.ROUTE_DEPOSITS} element={<Deposits />} />
      <Route path={Routes.ROUTE_WITHDRAWALS} element={<Withdrawals />} />
      <Route path={Routes.ROUTE_LOGS} element={<Logs />} />
      <Route
        path={Routes.ROUTE_CONFIG_REDIRECT}
        element={<RedirectToFirstWlConfig />}
      ></Route>
      <Route
        path={Routes.ROUTE_CONFIG_PARENT}
        element={
          <>
            <WhitelabelConfigHeader />
            <WhitelabelConfigLoader>
              <Outlet />
            </WhitelabelConfigLoader>
          </>
        }
      >
        <Route
          path={Routes.ROUTE_CONFIG_THEME}
          element={<ThemeConfig />}
        ></Route>
        <Route
          path={Routes.ROUTE_CONFIG_SETTINGS}
          element={<SettingsConfig />}
        ></Route>
        <Route
          path={Routes.ROUTE_CONFIG_PROFILE}
          element={<ProfileConfig />}
        ></Route>
        <Route
          path={Routes.ROUTE_CONFIG_COMMUNICATION}
          element={<CommunicationConfig />}
        ></Route>
      </Route>
    </Route>

    <Route element={<UnauthenticatedWall />}>
      <Route path={Routes.ROUTE_LOGIN} element={<Login />} />
    </Route>

    <Route path='/' element={<Navigate to={Routes.ROUTE_USERS} replace />} />
    <Route path='*' element={<>404</>} />
  </RouterRoutes>
);

export default Router;
