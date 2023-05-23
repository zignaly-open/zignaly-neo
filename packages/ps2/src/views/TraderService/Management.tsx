import React from 'react';
import ServiceManagementsContainer from './components/ServiceManagementsContainer';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import { PageContainer } from '@zignaly-open/ui';

const Management: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.management', serviceId);
  return (
    <PageContainer>
      <ServiceManagementsContainer serviceId={serviceId} />
    </PageContainer>
  );
};

export default Management;
