import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';

const EditService: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.edit', serviceId);
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default EditService;
