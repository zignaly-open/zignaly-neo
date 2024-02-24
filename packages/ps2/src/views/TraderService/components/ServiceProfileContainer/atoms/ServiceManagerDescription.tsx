import React, { useState } from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import Countries from 'i18n-iso-countries';
import { StyledVerifiedIcon } from '../styles';
import { Tooltip } from '@mui/material';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';
import Flag from '../../../../../components/Flag';
import RichDescriptionEditor from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor';
import { deserializeSlate } from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor/atoms/util';

const ServiceManagerDescription: React.FC<{ service: Service }> = ({
  service,
}) => {
  const { t, i18n } = useTranslation('service');
  const country = Countries.getName(service.ownerCountry, i18n.language);
  const [flagInFolder, setFlagInFolder] = useState(true);

  return (
    <Box>
      <RichDescriptionEditor
        id={'service-profile__about-manager'}
        value={deserializeSlate(service?.ownerDescription)}
        readMore
        readOnly
        label={t('about-trader')}
        sx={{ mt: 8 }}
        subtitle={
          <Box
            display='flex'
            columnGap={2}
            rowGap='6px'
            flexWrap={'wrap'}
            alignItems='center'
            mb={2}
          >
            <Box display='flex' alignItems='center' gap='10px'>
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
            </Box>

            <ZigTypography
              variant={'body2'}
              color='neutral400'
              component={'span'}
              id={'service-profile__trader-joined-time'}
              whiteSpace={'nowrap'}
            >
              {t('about-trader-joined-time', {
                date: formatLocalizedDistance(
                  new Date(),
                  new Date(service.ownerCreatedAt),
                ),
              })}
            </ZigTypography>
          </Box>
        }
      />
    </Box>
  );
};

export default ServiceManagerDescription;
