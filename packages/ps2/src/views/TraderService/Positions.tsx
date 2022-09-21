import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { TraderServicePageContainer } from '../../features/trader/components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../features/trader/use';

const Positions: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.positions', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default Positions;
