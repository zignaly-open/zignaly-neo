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
import BigNumber from 'bignumber.js';

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
  const investment = investments?.find((x) => x.serviceId === service.id);
  const investedAmount = investment
    ? new BigNumber(investment.invested).plus(investment.pending)
    : 0;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box sx={{ width: 165 }}>
        {isLoading ? (
          <LoaderWrapper>
            <CenteredLoader width={165} height={40} />
          </LoaderWrapper>
        ) : (
          <>
            {isAuthenticated && investedAmount ? (
              <InvestedButtonBase
                service={traderService}
                investedAmount={investedAmount.toString()}
              />
            ) : (
              <InvestButton service={traderService} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceAction;
