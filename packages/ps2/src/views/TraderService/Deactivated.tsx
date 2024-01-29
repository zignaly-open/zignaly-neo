import React from 'react';
import { useTraderServiceTitle } from '../../apis/service/use';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '@zignaly-open/ui';
import { ErrorWrapper, PageWithHeaderContainer } from './components/styles';

const Deactivated: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.signals', serviceId);
  return (
    <PageWithHeaderContainer>
      <ErrorWrapper>
        <ErrorMessage text={'This service is inactive. Check other services'} />
      </ErrorWrapper>
    </PageWithHeaderContainer>
  );
};

export default Deactivated;
