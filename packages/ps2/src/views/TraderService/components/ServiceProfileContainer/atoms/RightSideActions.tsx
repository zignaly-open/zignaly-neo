import { Box } from '@mui/system';
import LiquidatedLabel from './LiquidatedLabel';
import InvestedButton from './InvestedButton';
import InvestButton from './InvestButton';
import React, { useMemo } from 'react';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { Service } from '../../../../../apis/service/types';
import { useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { RightSideActionWrapper } from '../styles';
import { Loader, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ROUTE_PROFIT_SHARING_SERVICE_INVEST } from '../../../../../routes';
import { isFeatureOn } from '../../../../../whitelabel';
import { Features } from '../../../../../whitelabel/type';
import InviteButton from './InviteButton';
import { useTiersData } from 'apis/referrals/use';
import { Trans, useTranslation } from 'react-i18next';

enum RightSideActionStates {
  Loading,
  Liquidated,
  NotInvested,
  Invested,
  Error,
}

const RightSideActions: React.FC<{ service: Service }> = ({ service }) => {
  const isAuthenticated = useIsAuthenticated();
  const isInvested = useIsInvestedInService(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  const tiers = useTiersData(service.id, service.zglySuccessFee);
  const state = useMemo<RightSideActionStates>(() => {
    if (isInvested.isLoading || tiers.isLoading)
      return RightSideActionStates.Loading;
    if (isInvested.isError || tiers.isError) return RightSideActionStates.Error;
    if (service.liquidated) return RightSideActionStates.Liquidated;
    if (isAuthenticated && isInvested.thisAccount)
      return RightSideActionStates.Invested;
    return RightSideActionStates.NotInvested;
  }, [isInvested, service, tiers, isAuthenticated]);

  return (
    <RightSideActionWrapper>
      {state === RightSideActionStates.Liquidated && (
        <Box sx={{ mt: -0.5 }}>
          <LiquidatedLabel />
        </Box>
      )}
      {state === RightSideActionStates.Error && (
        <Box sx={{ mt: -0.5 }}>
          <ZigTypography
            fontWeight={'demibold'}
            variant={'body1'}
            color='redGraphOrError'
          >
            <Trans i18nKey={'failed-to-load'} t={t}>
              <ZigButton
                onClick={() => {
                  isInvested.refetch();
                  tiers.refetch();
                }}
                variant={'text'}
              ></ZigButton>
            </Trans>
          </ZigTypography>
        </Box>
      )}
      {state === RightSideActionStates.Loading && <Loader />}

      {[
        RightSideActionStates.Invested,
        RightSideActionStates.NotInvested,
      ].includes(state) && (
        <Box
          sx={{ mt: md ? 0 : 3 }}
          display='flex'
          gap={3}
          alignItems={'center'}
        >
          {isFeatureOn(Features.Referrals) && service.zglySuccessFee > 0 && (
            <InviteButton service={service} />
          )}
          {state === RightSideActionStates.Invested ? (
            <InvestedButton prefixId={'service-profile'} service={service} />
          ) : (
            <InvestButton
              modalRoute={ROUTE_PROFIT_SHARING_SERVICE_INVEST}
              prefixId={'service-profile'}
              showMultipleAccountButton
              service={service}
            />
          )}
        </Box>
      )}
    </RightSideActionWrapper>
  );
};

export default RightSideActions;
