import ServiceInvestorsContainer from 'views/TraderService/components/InvestorTable';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';

const Investors: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.investors', serviceId);
  return (
    <TraderServicePageContainer>
      <ServiceInvestorsContainer serviceId={serviceId} />
    </TraderServicePageContainer>
  );
};

export default Investors;
