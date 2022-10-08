import React from 'react';
import { generatePath, Navigate, Outlet } from 'react-router-dom';
import { useFirstOwnedService } from '../../apis/service/use';
import { ROUTE_TRADING_SERVICE } from '../../routes';

const NotATraderWall: React.FC = () => {
  const service = useFirstOwnedService();

  return service ? (
    <Navigate
      to={generatePath(ROUTE_TRADING_SERVICE, {
        serviceId: service?.serviceId,
      })}
      replace
    />
  ) : (
    <Outlet />
  );
};

export default NotATraderWall;
