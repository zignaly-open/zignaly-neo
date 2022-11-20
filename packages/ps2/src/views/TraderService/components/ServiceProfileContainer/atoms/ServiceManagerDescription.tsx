import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import SectionWithReadMore from './SectionWithReadMore';
import { Box } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import Countries from 'i18n-iso-countries';
import { formatDistance } from 'date-fns';
import { StyledVerifiedIcon } from '../styles';
import { Tooltip } from '@mui/material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { hasFlag } from 'country-flag-icons';

const ServiceManagerDescription: React.FC<{ service: Service }> = ({
  service,
}) => {
  const { t, i18n } = useTranslation('service');
  const country = Countries.getName(service.ownerCountry, i18n.language);

  return (
    <SectionWithReadMore
      content={service.ownerDescription}
      title={t('about-trader')}
      emptyText={t('about-trader-empty')}
      subtitle={
        <Box
          sx={{
            flexDirection: 'row',
            display: 'flex',
            flex: 1,
            alignItems: 'flex-start',
          }}
        >
          <ZigTypography
            variant={'h2'}
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {service.ownerName}
            <Tooltip title={t('owner-verified')}>
              <StyledVerifiedIcon sx={{ ml: 1 }} width={13} height={13} />
            </Tooltip>

            {service.ownerCountry && (
              <Tooltip
                title={t('owner-from', {
                  country: country || service.ownerCountry,
                })}
              >
                <ZigTypography variant={'h2'} sx={{ ml: 1 }}>
                  {hasFlag(service.ownerCountry)
                    ? getUnicodeFlagIcon(service.ownerCountry)
                    : '🏴‍☠️‍'}
                </ZigTypography>
              </Tooltip>
            )}
            <ZigTypography
              sx={{
                ml: 2,
              }}
              variant={'body2'}
              color='neutral400'
              component={'span'}
            >
              {t('about-trader-joined-time', {
                date: formatDistance(
                  new Date(),
                  new Date(service.ownerCreatedAt),
                ),
              })}
            </ZigTypography>
          </ZigTypography>
        </Box>
      }
    />
  );
};

export default ServiceManagerDescription;
