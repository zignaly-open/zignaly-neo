import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { useTraderServiceTitle } from '../../apis/service/use';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@zignaly-open/ui';

const Signals: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.signals', serviceId);
  return (
    <PageContainer>
      <ComingSoon />
    </PageContainer>
  );
};

export default Signals;
