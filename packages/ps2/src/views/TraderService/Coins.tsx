import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { TraderServicePageContainer } from './components/styles';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';

const Coins: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.coins', serviceId);
  return (
    <TraderServicePageContainer>
      <ComingSoon />
    </TraderServicePageContainer>
  );
};

export default Coins;
