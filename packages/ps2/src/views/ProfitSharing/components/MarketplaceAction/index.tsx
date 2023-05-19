import React, { Suspense } from 'react';
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
import { LoaderWrapper } from './styles';
import { MarketplaceActionType } from './types';
import BigNumber from 'bignumber.js';
import { CenteredLoader } from '@zignaly-open/ui';

const loadingSpinner = (
  <LoaderWrapper>
    <CenteredLoader width={165} height={40} />
  </LoaderWrapper>
);

const MarketplaceAction = ({
  service,
  prefixId = 'marketplace-table',
}: MarketplaceActionType) => {
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
          loadingSpinner
        ) : (
          <Suspense fallback={loadingSpinner}>
            <>
              {isAuthenticated && investedAmount ? (
                <InvestedButtonBase
                  prefixId={prefixId}
                  ctaId={'marketplace-invested-button'}
                  service={traderService}
                  investedAmount={investedAmount.toString()}
                />
              ) : (
                <InvestButton
                  prefixId={prefixId}
                  service={traderService}
                  ctaId={'marketplace-invest-button'}
                />
              )}
            </>
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceAction;
