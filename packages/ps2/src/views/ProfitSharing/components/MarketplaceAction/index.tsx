import React from 'react';
import { Box } from '@mui/material';
import {
  useActiveExchange,
  useIsAuthenticated,
} from '../../../../apis/user/use';
import { useInvestments } from '../../../../apis/investment/use';
import InvestButton from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestButton';
import { InvestedButtonBase } from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestedButton';
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
      <Box sx={{ minWidth: 195 }}>
        {isLoading ? (
          <LoaderWrapper>
            <CenteredLoader width={195} height={40} />
          </LoaderWrapper>
        ) : (
          <>
            {isAuthenticated && investedAmount ? (
              <InvestedButtonBase
                id={`marketplace-table__edit-${traderService.id}`}
                ctaId={'marketplace-invested-button'}
                service={traderService}
                investedAmount={investedAmount.toString()}
              />
            ) : (
              <InvestButton
                id={`marketplace-table__invest-${traderService.id}`}
                service={traderService}
                ctaId={'marketplace-invest-button'}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceAction;
