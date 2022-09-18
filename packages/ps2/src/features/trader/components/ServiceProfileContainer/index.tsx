import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { useIsServiceOwner, useServiceDetails } from '../../use';
import ComingSoon from '../../../../components/ComingSoon';
import { useIsAuthenticated } from '../../../auth/use';
import { TraderServiceAccessLevel } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../../routes';
import CenteredLoader from '../../../../components/CenteredLoader';

const ServiceProfileContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  const { isLoading: isLoadingService, data: service } =
    useServiceDetails(serviceId);
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

  return isLoadingService ? <CenteredLoader /> : <ComingSoon />;
};

export default ServiceProfileContainer;
