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
import { Loader } from '@zignaly-open/ui';

const RightSideActions: React.FC<{ service: Service }> = ({ service }) => {
  const isAuthenticated = useIsAuthenticated();
  const isInvested = useIsInvestedInService(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <RightSideActionWrapper>
      {service.liquidated && (
        <Box sx={{ mt: -0.5 }}>
          <LiquidatedLabel />
        </Box>
      )}

      {!isInvested.isLoading && !service.liquidated && (
        <Box sx={{ mt: md ? 0 : 3 }}>
          {isAuthenticated && isInvested.thisAccount ? (
            <InvestedButton
              id={'service__edit-investment'}
              service={service}
              ctaId={'service-profile-invested-button'}
            />
          ) : (
            <InvestButton
              showMultipleAccountButton
              service={service}
              ctaId={'service-profile-invest-button'}
            />
          )}
        </Box>
      )}

      {isInvested.isLoading && !service.liquidated && (
        <Loader color={'#fff'} width={'40px'} height={'40px'} ariaLabel={''} />
      )}
    </RightSideActionWrapper>
  );
};

export default RightSideActions;
