import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { useActiveExchange } from '../../../../../apis/user/use';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import { Box } from '@mui/system';
import { Avatar } from '@zignaly-open/ui';
import { getServiceLogo } from '../../../../../util/images';
import ServiceInformation from './ServiceInformation';

const ServiceProfileHeader: React.FC<{ service: Service }> = ({ service }) => {
  const isInvested = useIsInvestedInService(service.id);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  const activeExchange = useActiveExchange();

  useUpdateEffect(() => {
    activeExchange?.internalId && isInvested.refetch();
  }, [activeExchange?.internalId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: !sm && '10px',
      }}
    >
      <Box sx={{ marginBottom: sm ? 0 : 2 }}>
        <Avatar
          size={sm ? 'xx-large' : 'x-large'}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(service.logo)}
          id={'service-profile__avatar'}
        />
      </Box>
      <Box ml={sm ? '31px' : 0} sx={{ textAlign: sm ? 'left' : 'center' }}>
        <ServiceInformation service={service} />
      </Box>
    </Box>
  );
};

export default ServiceProfileHeader;
