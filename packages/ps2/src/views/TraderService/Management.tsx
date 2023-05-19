import React from 'react';
import ServiceManagementsContainer from './components/ServiceManagementsContainer';
import { useParams } from 'react-router-dom';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';

const Management: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.management', serviceId);
  return (
    <TraderServicePageContainer>
      <ServiceManagementsContainer serviceId={serviceId} />
    </TraderServicePageContainer>
  );
};

export default Management;
