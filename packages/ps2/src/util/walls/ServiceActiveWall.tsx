import React from 'react';
import {
  generatePath,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useServiceDetails } from '../../apis/service/use';
import { ROUTE_TRADING_SERVICE_UNACTIVATED } from '../../routes';
import { CenteredLoader } from '@zignaly-open/ui';

const ServiceActiveWall: React.FC = () => {
  const { serviceId } = useParams();
  const { data, isFetching } = useServiceDetails(serviceId);
  const location = useLocation();

  if (isFetching) return <CenteredLoader />;

  return !data?.activated &&
    !isFetching &&
    location?.pathname !==
      generatePath(ROUTE_TRADING_SERVICE_UNACTIVATED, {
        serviceId,
      }) ? (
    <Navigate
      to={generatePath(ROUTE_TRADING_SERVICE_UNACTIVATED, {
        serviceId,
      })}
    />
  ) : (
    <Outlet />
  );
};

export default ServiceActiveWall;
