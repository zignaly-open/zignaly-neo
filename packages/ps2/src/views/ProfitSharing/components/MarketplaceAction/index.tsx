import React from 'react';
import { Box } from '@mui/material';
import {
  useActiveExchange,
  useIsAuthenticated,
} from '../../../../apis/user/use';
import { useInvestments } from '../../../../apis/investment/use';
import {
  InvestButton,
  InvestedButtonBase,
} from '../../../TraderService/components/ServiceProfileContainer/atoms';
import { marketplaceServiceToServiceType } from '../../../../apis/marketplace/util';
import { Service } from '../../../../apis/service/types';
import CenteredLoader from '../../../../components/CenteredLoader';
import { LoaderWrapper } from './styles';
import { MarketplaceActionType } from './types';

const MarketplaceAction = ({ service }: MarketplaceActionType) => {
  const exchange = useActiveExchange();
  const isAuthenticated = useIsAuthenticated();

  const { isLoading, data: investments } = useInvestments(
    exchange?.internalId,
    {
      skip: !exchange?.internalId,
    },
  );

  const traderService = marketplaceServiceToServiceType(service) as Service;
  const investedAmount = investments?.find(
    (x) => x.serviceId === service.service_id,
  )?.invested;

  return (
    <Box justifyContent='center'>
      {isLoading ? (
        <LoaderWrapper>
          <CenteredLoader width={173} height={40} />
        </LoaderWrapper>
      ) : (
        <>
          {isAuthenticated && investedAmount ? (
            <InvestedButtonBase
              service={traderService}
              investedAmount={investedAmount}
            />
          ) : (
            <InvestButton service={traderService} />
          )}
        </>
      )}
    </Box>
  );
};

export default MarketplaceAction;
