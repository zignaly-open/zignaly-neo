import { Box } from '@mui/system';
import LiquidatedLabel from './LiquidatedLabel';
import InvestedButton, { MobileInvestedButton } from './InvestedButton';
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
import { usePrefetchTranslation } from 'util/i18n/i18nextHelpers';

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
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation('service');
  usePrefetchTranslation([
    ...(isFeatureOn(Features.Referrals) ? ['referrals-trader'] : []),
    'edit-investment',
    'deposit-crypto',
  ]);
  const tiers = useTiersData(service.id);
  const state = useMemo<RightSideActionStates>(() => {
    if (isInvested.isLoading || tiers.isLoading)
      return RightSideActionStates.Loading;
    if (isInvested.isError) return RightSideActionStates.Error;
    if (service.liquidated) return RightSideActionStates.Liquidated;
    if (isAuthenticated && isInvested.thisAccount)
      return RightSideActionStates.Invested;
    return RightSideActionStates.NotInvested;
  }, [isInvested, service, tiers, isAuthenticated]);

  const { investedAmount } = useIsInvestedInService(service.id);

  return (
    <RightSideActionWrapper isAuthenticated={isAuthenticated}>
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
                onClick={isInvested.refetch}
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
          display='flex'
          gap={3}
          alignItems={'center'}
          justifyContent={'center'}
          flexWrap={lg || !sm ? 'nowrap' : 'wrap'}
        >
          {isFeatureOn(Features.Referrals) &&
            service.zglySuccessFee > 0 &&
            !tiers.isError && (
              <InviteButton service={service} tiersData={tiers} fullSize={sm} />
            )}
          {state === RightSideActionStates.Invested ? (
            sm ? (
              <InvestedButton prefixId={'service-profile'} service={service} />
            ) : (
              <MobileInvestedButton
                service={service}
                id={'service-profile__invested'}
                investedAmount={investedAmount.toString()}
                showMultipleAccountButton
              />
            )
          ) : (
            <Box mt={!sm && '2px'}>
              <InvestButton
                modalRoute={ROUTE_PROFIT_SHARING_SERVICE_INVEST}
                prefixId={'service-profile'}
                showMultipleAccountButton
                service={service}
              />
            </Box>
          )}
        </Box>
      )}
    </RightSideActionWrapper>
  );
};

export default RightSideActions;
