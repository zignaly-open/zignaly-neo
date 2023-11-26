import React, { Suspense } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import {
  useActiveExchange,
  useIsAuthenticated,
} from '../../../../apis/user/use';
import { useInvestments } from '../../../../apis/investment/use';
import InvestButton from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestButton';
import {
  InvestedButtonBase,
  MobileInvestedButton,
} from '../../../TraderService/components/ServiceProfileContainer/atoms/InvestedButton';
import { marketplaceServiceToServiceType } from '../../../../apis/marketplace/util';
import { Service } from '../../../../apis/service/types';
import { LoaderWrapper } from './styles';
import { MarketplaceActionType } from './types';
import BigNumber from 'bignumber.js';
import { CenteredLoader, ZigButton } from '@zignaly-open/ui';
import { ZigCrossIcon } from '@zignaly-open/ui/icons';
import { MarketplaceService } from '../../../../apis/marketplace/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { useTranslation } from 'react-i18next';
import { useMarketplaceMobileActiveRow } from '../../../../apis/marketplace/use';
import { ZigTableMobileActionRow } from '../../../../components/ZigTableMobileActionRow';

const loadingSpinner = (
  <LoaderWrapper>
    <CenteredLoader width={155} height={40} />
  </LoaderWrapper>
);

export const MobileMarketplaceAction = ({
  service,
  rowId,
}: {
  rowId: string;
  service: MarketplaceService;
}) => {
  const { t } = useTranslation('marketplace');
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeRow, setActiveRow] = useMarketplaceMobileActiveRow();
  return (
    rowId === activeRow && (
      <ZigTableMobileActionRow safariHeight={93}>
        <MarketplaceAction service={service} fullSize={false} />
        <ZigButton
          size={'large'}
          variant={'outlined'}
          onClick={() =>
            navigate(
              generatePath(ROUTE_TRADING_SERVICE, {
                serviceId: service.id,
              }),
            )
          }
        >
          {t('table.view-profile')}
        </ZigButton>
        <IconButton
          onClick={() => {
            setActiveRow(null);
          }}
          sx={{ marginRight: '15px', marginLeft: '-10px' }}
        >
          <ZigCrossIcon
            width={25}
            height={25}
            color={theme.palette.neutral300}
          />
        </IconButton>
      </ZigTableMobileActionRow>
    )
  );
};

const MarketplaceAction = ({
  service,
  prefixId = 'marketplace-table',
  fullSize = true,
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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ minWidth: 170 }}>
        {isLoading ? (
          loadingSpinner
        ) : (
          <Suspense fallback={loadingSpinner}>
            <>
              {isAuthenticated && investedAmount ? (
                fullSize ? (
                  <InvestedButtonBase
                    prefixId={prefixId}
                    service={traderService}
                    investedAmount={investedAmount.toString()}
                  />
                ) : (
                  <MobileInvestedButton
                    service={traderService}
                    id={prefixId && `${prefixId}__edit-investment`}
                    investedAmount={investedAmount.toString()}
                  />
                )
              ) : (
                <InvestButton prefixId={prefixId} service={traderService} />
              )}
            </>
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default MarketplaceAction;
