import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { Loader } from '@zignaly-open/ui';
import { useIsServiceOwner, useTraderServiceDetails } from '../../use';
import { Center } from '../ServiceManagementsContainer/styles';
import ComingSoon from '../../../../components/ComingSoon';
import { useIsAuthenticated } from '../../../auth/use';
import { TraderServiceAccessLevel } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../../routes';

const ServiceProfileContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  const { isLoading: isLoadingService, data: service } =
    useTraderServiceDetails(serviceId);
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
      {isLoadingService ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={t('investors.loading-arialLabel')}
          />
        </Center>
      ) : (
        <ComingSoon />
      )}
    </>
  );
};

export default ServiceProfileContainer;
