import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { TraderServicePageContainer } from '../../features/trader/components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../features/trader/use';

const Manual: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.manual', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default Manual;
