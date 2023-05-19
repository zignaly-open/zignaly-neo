import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';

const Manual: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.manual', serviceId);
  return (
    <TraderServicePageContainer>
      <ComingSoon />
    </TraderServicePageContainer>
  );
};

export default Manual;
