import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { useParams } from 'react-router-dom';
import { useTraderServiceTitle } from '../../apis/service/use';
import { PageContainer } from '@zignaly-open/ui';

const Manual: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.manual', serviceId);
  return (
    <PageContainer>
      <ComingSoon />
    </PageContainer>
  );
};

export default Manual;
