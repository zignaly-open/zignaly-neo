import React from 'react';
import { Icon } from './styles';
import { ServiceNameProps } from './types';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { generatePath, Link } from 'react-router-dom';
import { getServiceLogo } from '../../../../util/images';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { StyledVerifiedIcon } from './styles';

export const ServiceName = ({ id, service, showCoin = true }: ServiceNameProps) => {
  const { t } = useTranslation('table');

  return (
    <Box
      id={id}
      component={Link}
      to={generatePath(ROUTE_TRADING_SERVICE, {
        serviceId: service.serviceId?.toString(),
      })}
      sx={{
        cursor: 'pointer',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'start',
        width: 300,
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
        <ZigTypography
          fontWeight='medium'
          color='neutral100'
          whiteSpace='normal'
        >
          {service.serviceName}
        </ZigTypography>
        <div>
          <ZigTypography variant='body2' fontWeight='medium' color='neutral400'>
            {t('serviceName-by')} {service.ownerName}
          </ZigTypography>
          {service.ownerVerified && (
            <Tooltip title={t('owner-verified')}>
              <StyledVerifiedIcon width={13} height={13} />
            </Tooltip>
          )}
        </div>
        {showCoin && (
          <ZigTypography variant='body2' fontWeight='medium' color='neutral400'>
            {service.ssc}
          </ZigTypography>
        )}
      </Box>
    </Box>
  );
};
