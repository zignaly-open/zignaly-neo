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
import {
  Loader,
  ZigButton,
  ZigInviteIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { ROUTE_PROFIT_SHARING_SERVICE_INVEST } from '../../../../../routes';
import { useZModal } from 'components/ZModal/use';
import ReferralsInviteModal from '../../ReferralsInviteModal';
import { Trans, useTranslation } from 'react-i18next';
import { isFeatureOn } from '../../../../../whitelabel';
import { Features } from '../../../../../whitelabel/type';
import useMaybeNavigateNotLoggedIn from 'util/hooks/useMaybeNavigateNotLoggedIn';

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
  const { showModal } = useZModal();
  const { t } = useTranslation('service');
  const navigateIfNotLoggedIn = useMaybeNavigateNotLoggedIn();
  const state = useMemo<RightSideActionStates>(() => {
    if (isInvested.isLoading) return RightSideActionStates.Loading;
    if (isInvested.isError) return RightSideActionStates.Error;
    if (service.liquidated) return RightSideActionStates.Liquidated;
    if (isAuthenticated && isInvested.thisAccount)
      return RightSideActionStates.Invested;
    return RightSideActionStates.NotInvested;
  }, [isInvested, service, isAuthenticated]);

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
          sx={{ mt: md ? 0 : 3 }}
          display='flex'
          gap={3}
          alignItems={'center'}
        >
          {isFeatureOn(Features.Referrals) && (
            <ZigButton
              ctaId={'service-profile-invite-button'}
              onClick={() => {
                if (isAuthenticated) {
                  showModal(ReferralsInviteModal, {
                    service,
                    serviceId: service.id,
                  });
                } else {
                  navigateIfNotLoggedIn();
                }
              }}
              sx={{
                height: '54px',
                minWidth: '63px',
                maxWidth: '63px',
                padding: '0',
                overflow: 'visible',
              }}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={0.5}
                alignItems={'center'}
                justifyContent={'center'}
                mt={'-10px'}
                textTransform={'capitalize'}
              >
                <ZigInviteIcon width={35} height={'100%'} />
                {t('invite')}
              </Box>
            </ZigButton>
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
