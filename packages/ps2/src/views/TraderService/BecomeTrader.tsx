import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { /*useLocation,*/ useParams } from 'react-router-dom';
// import { useIsServiceOwner/*, useServiceDetails, useTraderServiceTitle*/ } from '../../apis/service/use';
import ServiceManagementsContainer from './components/ServiceManagementsContainer';
// import { useIsAuthenticated } from '../../apis/user/use';
// import ComingSoon from '../../components/Stub/ComingSoon';

const BecomeTrader: React.FC = () => {
  const { t } = useTranslation('pages');
  const { serviceId } = useParams();
  // const location = useLocation();
  // useTraderServiceTitle('profit-sharing.service', serviceId);
  // const serviceDetailsEndpoint = useServiceDetails(serviceId);
  // const isAuthenticated = useIsAuthenticated();
  // const isOwner = useIsServiceOwner(serviceId);
  useTitle(t('become-trader'));
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ServiceManagementsContainer serviceId={serviceId} />
      </TraderServicePageContainer>
    </>
  );
};

export default BecomeTrader;
