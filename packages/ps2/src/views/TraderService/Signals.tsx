import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { TraderServicePageContainer } from '../../features/trader/components/styles';
import { useTraderServiceTitle } from '../../features/trader/use';
import { useParams } from 'react-router-dom';

const Signals: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.signals', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default Signals;
