import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useIsServiceOwner } from '../../../../apis/service/use';
import { Box } from '@mui/system';
import { getServiceLogo } from '../../../../util/images';
import { Avatar } from '@zignaly-open/ui';
import InvestedButton from './atoms/InvestedButton';
import LiquidatedLabel from './atoms/LiquidatedLabel';
import OtherAccountsButton from './atoms/OtherAccountsButton';
import ServiceInformation from './atoms/ServiceInformation';
import InvestButton from './atoms/InvestButton';
import { useMediaQuery } from '@mui/material';
import theme from 'theme';
import { useIsInvestedInService } from '../../../../apis/investment/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import {
  useActiveExchange,
  useIsAuthenticated,
} from '../../../../apis/user/use';
import { useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';

const ServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  const isOwner = useIsServiceOwner(service.id);
  const isInvested = useIsInvestedInService(service.id);
  const isAuthenticated = useIsAuthenticated();
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  const activeExchange = useActiveExchange();

  // we do not use the results of this till before the modal
  useCoinBalances();

  useUpdateEffect(() => {
    activeExchange?.internalId && isInvested.refetch();
  }, [activeExchange?.internalId]);

  return (
    <Box
      sx={{
        pl: md ? 4 : 0,
        pr: md ? 4 : 0,
      }}
      paddingTop={isOwner ? 7 : 0}
    >
      <Box
        sx={{
          p: 2,
          pt: 1,
          flexDirection: md ? 'row' : 'column',
          display: 'flex',
          flex: 1,
          alignItems: md ? 'flex-start' : 'center',
        }}
      >
        <Box sx={{ width: '55px', marginBottom: md ? 0 : 2 }}>
          <Avatar
            size={'x-large'}
            alt={t('logo-alt', { name: service.name })}
            image={getServiceLogo(service.logo)}
          />
        </Box>
        <Box
          ml={md ? 2 : 0}
          flex={1}
          sx={{ textAlign: md ? 'left' : 'center' }}
        >
          <ServiceInformation service={service} />
        </Box>

        {service.liquidated && (
          <Box sx={{ mt: -0.5 }}>
            <LiquidatedLabel />
          </Box>
        )}

        {!isInvested.isLoading && !service.liquidated && (
          <Box sx={{ mt: md ? -1.5 : 3 }}>
            {isAuthenticated && isInvested.thisAccount ? (
              <InvestedButton service={service} />
            ) : (
              <InvestButton service={service} />
            )}

            {isAuthenticated &&
              Object.keys(isInvested.accounts || {}).length > 1 && (
                <OtherAccountsButton service={service} />
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServiceProfileContainer;
