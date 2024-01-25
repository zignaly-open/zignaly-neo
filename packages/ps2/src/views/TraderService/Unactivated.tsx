import React, { useEffect } from 'react';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, PageContainer } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { PageWithHeaderContainer } from './components/styles';
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
        <Box
          bgcolor={'rgba(87,24,62,0.43)'}
          padding={'15px 15px'}
          borderRadius={'5px'}
          border={'1px solid redGraphOrError'}
        >
          <ErrorMessage
            text={'This service is inactive. Check other services'}
          />
        </Box>
      </PageWithHeaderContainer>
    </PageContainer>
  );
};

export default Unactivated;
