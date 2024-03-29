import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { Box, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import {
  GreySubHeader,
  GreySubHeaderHighlight,
  Separator,
  StyledCalendarMonthIcon,
  StyledPersonIcon,
  StyledVerifiedIcon,
} from '../styles';
import { ZigTypography } from '@zignaly-open/ui';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';

const ServiceInformation: React.FC<{
  service?: Service;
}> = ({ service }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  const createdAt = new Date(service?.createdAt);
  return (
    <>
      <ZigTypography
        variant={sm ? 'h1' : 'h2'}
        id={'service-profile__service-name'}
      >
        {service.name}
      </ZigTypography>
      <Box
        sx={{
          flexDirection: sm ? 'row' : 'column',
          display: 'flex',
          alignItems: 'center',
          paddingRight: sm ? 3 : 0,
        }}
      >
        <GreySubHeader
          component={sm ? 'span' : 'p'}
          id={'service-profile__owner-name'}
        >
          <StyledPersonIcon />
          <Trans
            t={t}
            i18nKey={'service-by'}
            components={[<GreySubHeaderHighlight key={'--service--by'} />]}
            values={{ name: service.ownerName }}
          />

          {service.ownerVerified && (
            <Tooltip title={t('owner-verified')}>
              <StyledVerifiedIcon
                width={13}
                height={13}
                id={'service-profile__owner-verified-icon'}
              />
            </Tooltip>
          )}
        </GreySubHeader>
        {sm && <Separator />}
        {sm && (
          <Tooltip
            title={createdAt.toLocaleDateString('zh-Hans-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          >
            <GreySubHeader
              component={sm ? 'span' : 'p'}
              id={'service-profile__started-since'}
            >
              <StyledCalendarMonthIcon />
              <Trans
                t={t}
                i18nKey={'service-age'}
                values={{
                  date: formatLocalizedDistance(new Date(), createdAt),
                }}
                components={[<GreySubHeaderHighlight key={'--service--by'} />]}
              />
            </GreySubHeader>
          </Tooltip>
        )}
      </Box>
    </>
  );
};

export default ServiceInformation;
