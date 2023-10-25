import React, { Suspense } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
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
import {
  CenteredLoader,
  trimZeros,
  ZigButton,
  ZigCrossIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { MarketplaceService } from '../../../../apis/marketplace/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { useTranslation } from 'react-i18next';
import { useMarketplaceMobileActiveRow } from '../../../../apis/marketplace/use';
import { useZModal } from '../../../../components/ZModal/use';
import EditInvestmentModal from '../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';

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
      <Box
        position={'absolute'}
        left={0}
        top={-2}
        sx={{
          backdropFilter: 'blur(7px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          gap: 2,
        }}
        width={'100%'}
        height={'100%'}
      >
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
      </Box>
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
  const { t } = useTranslation('marketplace');

  const { isLoading, data: investments } = useInvestments(
    exchange?.internalId,
    {
      skip: !exchange?.internalId,
    },
  );
  const { showModal } = useZModal({ disableAutoDestroy: true });

  const traderService = marketplaceServiceToServiceType(service) as Service;
  const investment = investments?.find((x) => x.serviceId === service.id);
  const investedAmount = investment
    ? new BigNumber(investment.invested).plus(investment.pending)
    : 0;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ minWidth: 165 }}>
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
                  <ZigButton
                    id={prefixId && `${prefixId}__edit-investment`}
                    size={'large'}
                    onClick={() => {
                      showModal(EditInvestmentModal, { serviceId: service.id });
                    }}
                    sx={{
                      flexDirection: 'column',
                      minWidth: 165,
                      padding: '6px 26px',
                    }}
                  >
                    <>
                      <ZigTypography
                        variant='body2'
                        color='neutral000'
                        fontWeight={600}
                        letterSpacing={1.1}
                        lineHeight={'20px'}
                        sx={{ textTransform: 'uppercase !important' }}
                      >
                        {t('table.invested', {
                          invested: trimZeros(investedAmount.toFixed(2)),
                        })}
                      </ZigTypography>

                      <ZigTypography
                        variant={'caption'}
                        component='p'
                        color='neutral150'
                        fontWeight={500}
                      >
                        {t('table.edit')}
                      </ZigTypography>
                    </>
                  </ZigButton>
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
