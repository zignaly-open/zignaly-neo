import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/trader/use';

const ServiceApi: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.api-trading', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default ServiceApi;
