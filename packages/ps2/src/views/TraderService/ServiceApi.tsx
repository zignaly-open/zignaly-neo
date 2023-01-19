import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import ApiKeyManagement from './components/ApiKeys/ApiKeyManagement';

const ServiceApi: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.api-trading', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ApiKeyManagement />
      </TraderServicePageContainer>
    </>
  );
};

export default ServiceApi;
