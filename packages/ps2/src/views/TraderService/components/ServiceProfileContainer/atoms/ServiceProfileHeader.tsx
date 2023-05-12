import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { useActiveExchange } from '../../../../../apis/user/use';
import { useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import { Box } from '@mui/system';
import { Avatar } from '@zignaly-open/ui';
import { getServiceLogo } from '../../../../../util/images';
import ServiceInformation from './ServiceInformation';

const ServiceProfileHeader: React.FC<{ service: Service }> = ({ service }) => {
  const isInvested = useIsInvestedInService(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  const activeExchange = useActiveExchange();

  useUpdateEffect(() => {
    activeExchange?.internalId && isInvested.refetch();
  }, [activeExchange?.internalId]);

  return (
    <Box
      sx={{
        flexDirection: md ? 'row' : 'column',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ marginBottom: md ? 0 : 2 }}>
        <Avatar
          size={'xx-large'}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(service.logo)}
          id={'service-profile__avatar'}
        />
      </Box>
      <Box ml={md ? '31px' : 0} sx={{ textAlign: md ? 'left' : 'center' }}>
        <ServiceInformation service={service} />
      </Box>
    </Box>
  );
};

export default ServiceProfileHeader;
