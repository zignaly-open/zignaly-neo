import { Grid } from '@mui/material';
import React from 'react';
import { Service } from '../../../dashboard/types';
import { useIsServiceOwner } from '../../use';
import { Box } from '@mui/system';
import { getServiceLogo } from '../../../../util/images';
import { Avatar, Button } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import {
  GreySubHeader,
  GreySubHeaderHighlight,
  Separator,
  ServiceHeader,
  StyledCalendarMonthIcon,
  StyledPersonIcon,
  StyledVerifiedIcon,
} from './styles';
import LinkIcon from '@mui/icons-material/Link';
import { formatDistance } from 'date-fns';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { useToast } from '../../../../util/hooks/useToast';

const ServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  const toast = useToast();
  const isOwner = useIsServiceOwner(service.id);
  const { t } = useTranslation('service');
  return (
    <Grid container paddingTop={isOwner ? 4 : 0}>
      <Grid item sm={12} md={isOwner ? 12 : 8} lg={isOwner ? 12 : 9}>
        <Box sx={{ flexDirection: 'row', display: 'flex' }}>
          <Avatar size={'x-large'} image={getServiceLogo(service.logo)} />
          <Box ml={1.5}>
            <ServiceHeader component={'h1'}>{service.name}</ServiceHeader>
            <StyledPersonIcon />
            <GreySubHeader>
              <Trans
                t={t}
                i18nKey={'service-by'}
                components={[<GreySubHeaderHighlight key={'--service--by'} />]}
                values={{ name: service.ownerName }}
              />
              {service.ownerVerified && (
                <StyledVerifiedIcon width={13} height={13} />
              )}
            </GreySubHeader>
            <Separator />
            <GreySubHeader>
              <StyledCalendarMonthIcon />
              <Trans
                t={t}
                i18nKey={'service-age'}
                values={{
                  date: formatDistance(
                    new Date(),
                    new Date(service.ownerCreatedAt),
                  ),
                }}
                components={[<GreySubHeaderHighlight key={'--service--by'} />]}
              />
            </GreySubHeader>
            <Separator />
            <Button
              minWidth={30}
              onClick={() => {
                copy(
                  window.location.origin +
                    generatePath(ROUTE_TRADING_SERVICE, {
                      serviceId: service.id,
                    }),
                );
                toast.success(t('link-copied'));
              }}
              size={'xsmall'}
              variant={'secondary'}
              caption={<LinkIcon width={13} height={13} />}
            />
          </Box>
        </Box>
      </Grid>
      {!isOwner && <Grid item sm={12} md={4} lg={3}></Grid>}
    </Grid>
  );
};

export default ServiceProfileContainer;
