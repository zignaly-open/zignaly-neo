import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ServiceProfileContainer from './components/ServiceProfileContainer';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import {
  useIsServiceOwner,
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import { useIsAuthenticated } from '../../apis/user/use';
import { ROUTE_404, ROUTE_LOGIN, ROUTE_PROFIT_SHARING } from '../../routes';
import { Service, TraderServiceAccessLevel } from '../../apis/service/types';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { BackendError, ErrorCodes } from '../../util/errors';
import CriticalError from '../../components/Stub/CriticalError';

const ServiceProfile: React.FC = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  useTraderServiceTitle('profit-sharing.service', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();
  const isOwner = useIsServiceOwner(serviceId);

  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer isOwner={isOwner}>
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
              return (
                <Navigate
                  to={ROUTE_LOGIN}
                  state={{
                    redirectTo: location,
                  }}
                />
              );
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
                return (
                  <Navigate
                    to={ROUTE_LOGIN}
                    state={{
                      redirectTo: location,
                    }}
                  />
                );
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
