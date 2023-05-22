import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { TraderServicePageContainer } from './components/styles';
import { useTraderServiceTitle } from '../../apis/service/use';
import { useParams } from 'react-router-dom';

const Signals: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.signals', serviceId);
  return (
    <TraderServicePageContainer>
      <ComingSoon />
    </TraderServicePageContainer>
  );
};

export default Signals;
