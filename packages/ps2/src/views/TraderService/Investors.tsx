import ServiceInvestorsContainer from 'views/TraderService/components/InvestorTable';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import { PageContainer } from '@zignaly-open/ui';

const Investors: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.investors', serviceId);
  return (
    <PageContainer>
      <ServiceInvestorsContainer serviceId={serviceId} />
    </PageContainer>
  );
};

export default Investors;
