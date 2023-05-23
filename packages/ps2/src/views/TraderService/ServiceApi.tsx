import React from 'react';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import ApiKeyManagement from './components/ApiKeys/ApiKeyManagement';
import { PageContainer } from '@zignaly-open/ui';

const ServiceApi: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.api-trading', serviceId);
  return (
    <PageContainer>
      <TraderServicePageContainer>
        <ApiKeyManagement />
      </TraderServicePageContainer>
    </PageContainer>
  );
};

export default ServiceApi;
