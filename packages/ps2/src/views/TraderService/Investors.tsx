import ServiceInvestorsContainer from 'features/trader/components/InvestorTable';
import React from 'react';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from '../../features/trader/components/styles';
import { useTraderServiceTitle } from '../../features/trader/use';

const Investors: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.investors', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ServiceInvestorsContainer serviceId={serviceId} />
      </TraderServicePageContainer>
    </>
  );
};

export default Investors;
