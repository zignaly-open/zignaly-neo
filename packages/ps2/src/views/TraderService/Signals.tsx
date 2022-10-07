import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/trader/use';
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
