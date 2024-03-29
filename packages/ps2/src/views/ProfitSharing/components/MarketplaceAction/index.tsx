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
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { useTranslation } from 'react-i18next';
import { useMarketplaceMobileActiveRow } from '../../../../apis/marketplace/use';
import { ZigTableMobileActionRow } from '../../../../components/ZigTableMobileActionRow';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
        <MarketplaceAction service={service} investedVariant={'mobile'} />
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
  investedVariant,
  showRocket = false,
  showArrow = false,
  fullSizeInvest = true,
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
  // Margin to keep arrow aligned with button, and button aligned with other columns
  const subMargin = isAuthenticated && investedAmount ? 0 : '28px';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading ? (
        loadingSpinner
      ) : (
        <Suspense fallback={loadingSpinner}>
          <Box
            display='flex'
            gap='25px'
            alignItems={'center'}
            mt={showArrow ? subMargin : 0}
          >
            <Box sx={{ minWidth: fullSizeInvest ? 170 : 115 }}>
              {isAuthenticated && investedAmount ? (
                investedVariant === 'mobile' ? (
                  <MobileInvestedButton
                    service={traderService}
                    id={prefixId && `${prefixId}__edit-investment`}
                    investedAmount={investedAmount.toString()}
                  />
                ) : (
                  <InvestedButtonBase
                    variant={investedVariant}
                    prefixId={prefixId}
                    service={traderService}
                    investedAmount={investedAmount.toString()}
                  />
                )
              ) : (
                <InvestButton
                  prefixId={prefixId}
                  service={traderService}
                  showRocket={showRocket}
                  fullSize={fullSizeInvest}
                />
              )}
            </Box>
            {showArrow && (
              <Box
                component={Link}
                to={generatePath(ROUTE_TRADING_SERVICE, {
                  serviceId: service.id,
                })}
                sx={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  width: '10px',
                  mb: subMargin,
                }}
                id={`marketplace-table__link-${service.id}`}
              >
                <ArrowForwardIosIcon
                  sx={{
                    color: 'links',
                    width: '20px',
                    height: '20px',
                  }}
                />
              </Box>
            )}
          </Box>
        </Suspense>
      )}
    </Box>
  );
};

export default MarketplaceAction;
