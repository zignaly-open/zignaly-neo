import React from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import AuthenticatedWall from 'util/walls/AuthenticatedWall';
import UnauthenticatedWall from './util/walls/UnauthenticatedWall';
import * as Routes from './routes';

const Router: React.FC = () => (
  <RouterRoutes>
    <Route element={<AuthenticatedWall />}>
      <Route path={Routes.ROUTE_USERS} element={<>USERS</>} />
      <Route path={Routes.ROUTE_TRANSFERS} element={<>TRANSFERS</>} />
    </Route>

    <Route element={<UnauthenticatedWall />}>
      <Route path={Routes.ROUTE_LOGIN} element={<>LOGIN</>} />
    </Route>

    <Route path='/' element={<Navigate to={Routes.ROUTE_USERS} replace />} />
    <Route path='*' element={<>404</>} />
  </RouterRoutes>
);

export default Router;
