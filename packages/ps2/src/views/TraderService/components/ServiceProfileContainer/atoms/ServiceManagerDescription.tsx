import React, { useState } from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import MarkdownSection from './MarkdownSection';
import { Box } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import Countries from 'i18n-iso-countries';
import { StyledVerifiedIcon } from '../styles';
import { Tooltip } from '@mui/material';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';
import Flag from '../../../../../components/Flag';

const ServiceManagerDescription: React.FC<{ service: Service }> = ({
  service,
}) => {
  const { t, i18n } = useTranslation('service');
  const country = Countries.getName(service.ownerCountry, i18n.language);
  const [flagInFolder, setFlagInFolder] = useState(true);

  return (
    <Box>
      <MarkdownSection
        id={'service-profile__about-manager'}
        content={service.ownerDescription}
        title={t('about-trader')}
        emptyText={t('about-trader-empty')}
        subtitle={
          <Box
            display='flex'
            columnGap={2}
            rowGap='6px'
            flexWrap={'wrap'}
            alignItems='center'
            mb={1}
          >
            <Box display='flex' alignItems='center' gap='3px'>
              <ZigTypography
                variant={'h2'}
                id={'service-profile__service-owner-name'}
                whiteSpace={'nowrap'}
              >
                {service.ownerName}
              </ZigTypography>
              {service.ownerVerified && (
                <Tooltip title={t('owner-verified')}>
                  <StyledVerifiedIcon
                    sx={{ ml: 0 }}
                    width={13}
                    height={13}
                    id={'service-profile__verified-icon'}
                  />
                </Tooltip>
              )}
            </Box>

            <Box display={'flex'} alignItems={'center'} mb='1px' gap={'10px'}>
              {service.ownerCountry && flagInFolder && (
                <Tooltip
                  title={t('owner-from', {
                    country:
                      country || service.ownerCountry?.toLocaleUpperCase(),
                  })}
                >
                  <span
                    id={'service-profile__country-flag'}
                    style={{ fontSize: 0, lineHeight: 0 }}
                  >
                    <Flag
                      country={service.ownerCountry}
                      onError={() => {
                        setFlagInFolder(false);
                      }}
                    />
                  </span>
                </Tooltip>
              )}
              <ZigTypography
                variant={'body2'}
                color='neutral400'
                component={'span'}
                id={'service-profile__trader-joined-time'}
              >
                {t('about-trader-joined-time', {
                  date: formatLocalizedDistance(
                    new Date(),
                    new Date(service.ownerCreatedAt),
                  ),
                })}
              </ZigTypography>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default ServiceManagerDescription;
