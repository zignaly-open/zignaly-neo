import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import Login from 'components/Login';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import * as Routes from './routes';
import Users from './components/Users';
import Withdrawals from './components/Transfers/Withdrawals';
import Deposits from './components/Transfers/Deposits';
import Logs from './components/Logs';

const Router: React.FC = () => (
  <RouterRoutes>
    <Route element={<AuthenticatedWall />}>
      <Route path={Routes.ROUTE_USERS} element={<Users />} />
      <Route path={Routes.ROUTE_DEPOSITS} element={<Deposits />} />
      <Route path={Routes.ROUTE_WITHDRAWALS} element={<Withdrawals />} />
      <Route path={Routes.ROUTE_LOGS} element={<Logs />} />
    </Route>

    <Route element={<UnauthenticatedWall />}>
      <Route path={Routes.ROUTE_LOGIN} element={<Login />} />
    </Route>

    <Route path='/' element={<Navigate to={Routes.ROUTE_USERS} replace />} />
    <Route path='*' element={<>404</>} />
  </RouterRoutes>
);

export default Router;
