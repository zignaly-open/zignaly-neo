import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import ServiceManagementsContainer from '../../features/trader/components/ServiceManagementsContainer';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from '../../features/trader/components/styles';

const Management: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  const { serviceId } = useParams();
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ServiceManagementsContainer serviceId={serviceId} />
      </TraderServicePageContainer>
    </>
  );
};

export default Management;
