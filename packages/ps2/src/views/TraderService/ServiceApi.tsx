import React from 'react';
import { PageWithHeaderContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import ApiKeyManagement from './components/ApiKeys/ApiKeyManagement';
import { PageContainer } from '@zignaly-open/ui';

const ServiceApi: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.api-trading', serviceId);
  return (
    <PageContainer>
      <PageWithHeaderContainer>
        <ApiKeyManagement />
      </PageWithHeaderContainer>
    </PageContainer>
  );
};

export default ServiceApi;
