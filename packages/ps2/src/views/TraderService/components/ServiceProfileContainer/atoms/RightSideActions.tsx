import { Box } from '@mui/system';
import LiquidatedLabel from './LiquidatedLabel';
import InvestedButton from './InvestedButton';
import InvestButton from './InvestButton';
import React from 'react';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { Service } from '../../../../../apis/service/types';
import { useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { RightSideActionWrapper } from '../styles';
import { Loader, ZigButton } from '@zignaly-open/ui';
import { ROUTE_PROFIT_SHARING_SERVICE_INVEST } from '../../../../../routes';
import { useZModal } from 'components/ZModal/use';
import ReferralsInviteModal from '../../ReferralsInviteModal';

const RightSideActions: React.FC<{ service: Service }> = ({ service }) => {
  const isAuthenticated = useIsAuthenticated();
  const isInvested = useIsInvestedInService(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { showModal } = useZModal();

  return (
    <RightSideActionWrapper>
      {service.liquidated && (
        <Box sx={{ mt: -0.5 }}>
          <LiquidatedLabel />
        </Box>
      )}

      {!isInvested.isLoading && !service.liquidated && (
        <Box sx={{ mt: md ? 0 : 3 }}>
          <ZigButton
            // modalRoute={ROUTE_PROFIT_SHARING_SERVICE_INVEST}
            // ctaId={'service-profile-invest-button'}
            onClick={() =>
              showModal(ReferralsInviteModal, {
                service,
                serviceId: service.id,
              })
            }
          >
            Invite
          </ZigButton>
          {isAuthenticated && isInvested.thisAccount ? (
            <InvestedButton
              prefixId={'service-profile'}
              service={service}
              ctaId={'service-profile-invested-button'}
            />
          ) : (
            <InvestButton
              modalRoute={ROUTE_PROFIT_SHARING_SERVICE_INVEST}
              prefixId={'service-profile'}
              showMultipleAccountButton
              service={service}
              ctaId={'service-profile-invest-button'}
            />
          )}
        </Box>
      )}

      {isInvested.isLoading && !service.liquidated && <Loader />}
    </RightSideActionWrapper>
  );
};

export default RightSideActions;
