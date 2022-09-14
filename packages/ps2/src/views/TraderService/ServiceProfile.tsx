import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { useParams } from 'react-router-dom';
import ServiceProfileContainer from '../../features/trader/components/ServiceProfileContainer';
import { TraderServicePageContainer } from 'features/trader/components/styles';

const ServiceProfile: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  const { serviceId } = useParams();
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
