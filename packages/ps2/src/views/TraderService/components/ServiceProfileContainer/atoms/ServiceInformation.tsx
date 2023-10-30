import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { Box, Tooltip, useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
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
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  return (
    <>
      <ZigTypography variant={'h1'} id={'service-profile__service-name'}>
        {service.name}
      </ZigTypography>
      <Box
        sx={{
          flexDirection: md ? 'row' : 'column',
          display: 'flex',
          alignItems: 'center',
          paddingRight: md ? 3 : 0,
        }}
      >
        <GreySubHeader
          component={md ? 'span' : 'p'}
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
        {md && <Separator />}
        <GreySubHeader
          component={md ? 'span' : 'p'}
          id={'service-profile__started-since'}
        >
          <StyledCalendarMonthIcon />
          <Trans
            t={t}
            i18nKey={'service-age'}
            values={{
              date: formatLocalizedDistance(
                new Date(),
                new Date(service.createdAt),
              ),
            }}
            components={[<GreySubHeaderHighlight key={'--service--by'} />]}
          />
        </GreySubHeader>
      </Box>
    </>
  );
};

export default ServiceInformation;