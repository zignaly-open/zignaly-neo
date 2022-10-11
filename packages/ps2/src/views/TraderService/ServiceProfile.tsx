import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { Navigate, useParams } from 'react-router-dom';
import ServiceProfileContainer from './components/ServiceProfileContainer';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import { useIsAuthenticated, useSetMissedRoute } from '../../apis/user/use';
import { ROUTE_404, ROUTE_LOGIN, ROUTE_PROFIT_SHARING } from '../../routes';
import { Service, TraderServiceAccessLevel } from '../../apis/service/types';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { BackendError, ErrorCodes } from '../../util/errors';
import CriticalError from '../../components/Stub/CriticalError';

const ServiceProfile: React.FC = () => {
  const { serviceId } = useParams();
  const setMissedRoute = useSetMissedRoute();
  useTraderServiceTitle('profit-sharing.service', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <LayoutContentWrapper
          endpoint={serviceDetailsEndpoint}
          error={(error: BackendError) => {
            if (error?.data?.error.code === ErrorCodes.SoloService)
              return <Navigate to={ROUTE_PROFIT_SHARING} />;
            if (error?.data?.error.code === ErrorCodes.NoSuchService)
              return <Navigate to={ROUTE_404} />;
            if (
              !isAuthenticated &&
              error?.data?.error.code === ErrorCodes.PrivateService
            ) {
              setMissedRoute();
              return <Navigate to={ROUTE_LOGIN} />;
            }

            return <CriticalError />;
          }}
          content={(service: Service) => {
            if (!isAuthenticated) {
              if (
                [
                  TraderServiceAccessLevel.Solo,
                  TraderServiceAccessLevel.Private,
                ].includes(service?.level)
              ) {
                setMissedRoute();
                return <Navigate to={ROUTE_LOGIN} />;
              }
            }

            return <ServiceProfileContainer service={service} />;
          }}
        />
      </TraderServicePageContainer>
    </>
  );
};

export default ServiceProfile;
