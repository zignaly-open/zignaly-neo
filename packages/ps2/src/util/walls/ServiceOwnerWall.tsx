import React from 'react';
import { generatePath, Navigate, Outlet, useParams } from 'react-router-dom';
import { useIsServiceOwner } from '../../apis/trader/use';
import { ROUTE_TRADING_SERVICE } from '../../routes';

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

export default ServiceOwnerWall;
