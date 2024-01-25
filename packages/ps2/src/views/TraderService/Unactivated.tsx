import React, { useEffect } from 'react';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, PageContainer } from '@zignaly-open/ui';
import { ErrorWrapper, PageWithHeaderContainer } from './components/styles';
import { ROUTE_TRADING_SERVICE_MANAGE } from '../../routes';

const Unactivated: React.FC = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { data } = useServiceDetails(serviceId);
  useEffect(() => {
    if (data?.activated) {
      navigate(generatePath(ROUTE_TRADING_SERVICE_MANAGE, { serviceId }));
    }
  }, [data?.activated]);
  useTraderServiceTitle('profit-sharing.signals', serviceId);
  return (
    <PageContainer>
      <PageWithHeaderContainer>
        <ErrorWrapper>
          <ErrorMessage
            text={'This service is inactive. Check other services'}
          />
        </ErrorWrapper>
      </PageWithHeaderContainer>
    </PageContainer>
  );
};

export default Unactivated;
