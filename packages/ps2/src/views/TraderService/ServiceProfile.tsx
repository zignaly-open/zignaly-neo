import React from 'react';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceProfileContainer from '../../features/trader/components/ServiceProfileContainer';
import { TraderServicePageContainer } from 'features/trader/components/styles';
import {
  useIsServiceOwner,
  useServiceDetails,
  useTraderServiceTitle,
} from '../../features/trader/use';
import { useIsAuthenticated } from '../../features/auth/use';
import { TraderServiceAccessLevel } from '../../features/trader/types';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../routes';

const ServiceProfile: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.service', serviceId);
  const { data: service } = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const isOwner = useIsServiceOwner(serviceId);

  switch (service?.level) {
    case TraderServiceAccessLevel.Solo:
      !isOwner && navigate(ROUTE_PROFIT_SHARING);
      break;
    case TraderServiceAccessLevel.Private:
      !isAuthenticated && navigate(ROUTE_DASHBOARD);
      break;
    case TraderServiceAccessLevel.Public:
    default:
    // Do nothing
  }

  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ServiceProfileContainer serviceId={serviceId} />
      </TraderServicePageContainer>
    </>
  );
};

export default ServiceProfile;
