import React from 'react';
import { Icon } from './styles';
import { ServiceNameProps } from './types';
import { Avatar, Typography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { generatePath, useNavigate } from 'react-router-dom';
import { getServiceLogo } from '../../../../util/images';
import { useTranslation } from 'react-i18next';

export const ServiceName = ({ service }: ServiceNameProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('table');

  return (
    <Box
      onClick={() =>
        navigate(
          generatePath(ROUTE_TRADING_SERVICE, {
            serviceId: service.serviceId?.toString(),
          }),
        )
      }
      sx={{
        cursor: 'pointer',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'start',
      }}
    >
      <Icon>
        <Avatar size={'x-large'} image={getServiceLogo(service.serviceLogo)} />
      </Icon>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body1' weight='medium' color='neutral100'>
          {service.serviceName}
        </Typography>
        <Typography variant='body2' weight='medium' color='neutral400'>
          {t('serviceName-by')} {service.ownerName}
        </Typography>
        <Typography variant='body2' weight='medium' color='neutral400'>
          {service.ssc}
        </Typography>
      </Box>
    </Box>
  );
};
