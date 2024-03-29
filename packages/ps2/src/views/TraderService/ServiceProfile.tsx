import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ServiceProfileContainer from './components/ServiceProfileContainer';
import { PageWithHeaderContainer } from 'views/TraderService/components/styles';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import { useIsAuthenticated } from '../../apis/user/use';
import { ROUTE_404, ROUTE_PROFIT_SHARING } from '../../routes';
import { Service, TraderServiceAccessLevel } from '../../apis/service/types';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { BackendError, ErrorCodes } from '../../util/errors';
import CriticalError from '../../components/Stub/CriticalError';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import InvestDepositModal from '../Dashboard/components/ManageInvestmentModals/InvestDepositModal';
import { PageContainer } from '@zignaly-open/ui';
import { getNotLoggedInNavigationRoute } from '../../util/hooks/useMaybeNavigateNotLoggedIn';
import { isFeatureOn } from '../../whitelabel';
import { Features } from '../../whitelabel/type';

const ServiceProfile: React.FC = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  useTraderServiceTitle('profit-sharing.service', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated && isFeatureOn(Features.LoginOnlyAccess)) {
    return (
      <Navigate
        to={getNotLoggedInNavigationRoute()}
        state={{
          redirectTo: location,
        }}
      />
    );
  }

  return (
    <>
      <PageContainer>
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
                  to={getNotLoggedInNavigationRoute()}
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
                    to={getNotLoggedInNavigationRoute()}
                    state={{
                      redirectTo: location,
                    }}
                  />
                );
              }
            }

            return (
              <PageWithHeaderContainer>
                <ServiceProfileContainer service={service} />
              </PageWithHeaderContainer>
            );
          }}
        />
      </PageContainer>
    </>
  );
};

export default ServiceProfile;

export const ServiceProfileInvestment = createZModalRouteElement({
  component: InvestDepositModal,
  options: {
    disableAutoDestroy: true,
  },
});
