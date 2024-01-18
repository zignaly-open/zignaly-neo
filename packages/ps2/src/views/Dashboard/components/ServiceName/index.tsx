import React from 'react';
import { Icon, TruncatedServiceName } from './styles';
import { ServiceNameProps } from './types';
import { Avatar, ZScore, ZigTypography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { generatePath, Link } from 'react-router-dom';
import { getServiceLogo } from '../../../../util/images';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { StyledVerifiedIcon } from './styles';
import ZScoreModal from 'views/TraderService/components/ZScoreModal';
import { useZModal } from 'components/ZModal/use';

export const ServiceName = ({
  prefixId,
  service,
  showCoin = true,
  size = 'x-large',
  showOwner = true,
  truncateServiceName = false,
  activeLink = true,
  className = '',
  zscore,
}: ServiceNameProps) => {
  const { t } = useTranslation('table');
  const linkProps = activeLink
    ? {
        component: Link,
        to: generatePath(ROUTE_TRADING_SERVICE, {
          serviceId: service.serviceId?.toString(),
        }),
      }
    : {};
  const { showModal } = useZModal();

  return (
    <Box
      id={prefixId && `${prefixId}__service-${service.serviceId}`}
      sx={{
        cursor: activeLink ? 'pointer' : 'auto',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'start',
        width: size === 'x-large' ? 300 : size === 'large' ? 200 : 130,
        paddingRight: truncateServiceName && '5px',
      }}
      className={className}
      {...linkProps}
    >
      <Icon>
        <Avatar
          size={size}
          image={getServiceLogo(service.serviceLogo)}
          id={prefixId && `${prefixId}__logo-${service.serviceId}`}
        />
        {zscore !== undefined && (
          <ZScore
            value={zscore}
            onClick={() =>
              showModal(ZScoreModal, {
                serviceId: service.serviceId,
              })
            }
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 1,
              transform: 'translateY(50%)',
            }}
          />
        )}
      </Icon>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <TruncatedServiceName
          id={prefixId && `${prefixId}__name-${service.serviceId}`}
          fontWeight='medium'
          color='neutral100'
          variant={size === 'x-large' ? 'body1' : 'body2'}
          truncate={truncateServiceName}
        >
          {service.serviceName}
        </TruncatedServiceName>
        {showOwner && (
          <div>
            <ZigTypography
              variant='body2'
              fontWeight='medium'
              color='neutral400'
              id={prefixId && `${prefixId}__owner-${service.serviceId}`}
            >
              {t('serviceName-by')} {service.ownerName}
            </ZigTypography>
            {service.ownerVerified && (
              <Tooltip title={t('owner-verified')}>
                <StyledVerifiedIcon
                  width={13}
                  height={13}
                  id={prefixId && `${prefixId}__verified-${service.serviceId}`}
                />
              </Tooltip>
            )}
          </div>
        )}
        {showCoin && (
          <ZigTypography
            variant='body2'
            fontWeight='medium'
            color='neutral400'
            id={prefixId && `${prefixId}__ssc-${service.serviceId}`}
          >
            {service.ssc}
          </ZigTypography>
        )}
      </Box>
    </Box>
  );
};
