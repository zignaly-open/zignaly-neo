import React from 'react';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import ServiceManagementsContainer from '../../features/trader/components/ServiceManagementsContainer';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from '../../features/trader/components/styles';
import { useTraderServiceTitle } from '../../features/trader/use';
import ManagementHelper from '../../features/trader/components/ManagementHelper';

const Management: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.management', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ServiceManagementsContainer serviceId={serviceId} />
        <ManagementHelper />
      </TraderServicePageContainer>
    </>
  );
};

export default Management;
