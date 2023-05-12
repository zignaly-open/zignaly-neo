import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useToast } from '../../../../../util/hooks/useToast';
import { Box, Tooltip, useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { Trans, useTranslation } from 'react-i18next';
import {
  GreySubHeader,
  GreySubHeaderHighlight,
  LinkIconWithSafariFix,
  Separator,
  ServiceHeader,
  StyledCalendarMonthIcon,
  StyledPersonIcon,
  StyledVerifiedIcon,
} from '../styles';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../../routes';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';

const ServiceInformation: React.FC<{
  service?: Service;
}> = ({ service }) => {
  const toast = useToast();
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
          paddingTop: md ? 1 : 0,
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
        {md ? <Separator /> : <Box mt={2} />}
        <ZigButton
          narrow
          data-tack-cta={'service-profile-copy-link'}
          id={'service-profile__copy-link'}
          sx={{ '&&': { minWidth: '30px !important' } }}
          onClick={() => {
            copy(
              window.location.origin +
                generatePath(ROUTE_TRADING_SERVICE, {
                  serviceId: service.id,
                }),
            );
            toast.success(t('link-copied'));
          }}
          startIcon={
            md ? null : (
              <LinkIconWithSafariFix
                style={{ width: '13px', height: '13px' }}
                color='neutral300'
                width={15}
                height={13}
              />
            )
          }
          size={'small'}
          variant={'outlined'}
        >
          {md ? (
            <LinkIconWithSafariFix color='neutral300' width={13} height={13} />
          ) : (
            t('copy-link')
          )}
        </ZigButton>
      </Box>
    </>
  );
};

export default ServiceInformation;
