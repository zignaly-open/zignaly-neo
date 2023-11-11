import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import RightSideActions from './atoms/RightSideActions';
import ServiceGrowthChart from './atoms/ServiceGrowthChart';
import ServiceDescription from './atoms/ServiceDescription';
import ServiceManagerDescription from './atoms/ServiceManagerDescription';
import ServiceSummary from './atoms/ServiceSummary';
import AssetsInPool from '../../../../components/AssetsInPool';
import { AssetsInPoolWrapper, ServiceInfoWrapper } from './styles';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { subMonths } from 'date-fns';
import ServicePercentageInfo from './atoms/ServicePercentageInfo';
import ServiceCanonical from './atoms/ServiceCanonical';

const ServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  // we do not use the results of this till before the modal
  useCoinBalances();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation(['service', 'marketplace']);
  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        mt: { xs: '-15px', md: '-45px' },
      }}
    >
      <ServiceCanonical service={service} />
      <Grid container>
        <Grid item sx={{ display: 'flex' }} xs={12} md={7} pb={4}>
          <ServiceProfileHeader service={service} />
        </Grid>
        <Grid item xs={12} md={5} pb={sm && 4}>
          <RightSideActions service={service} />
        </Grid>
        {!sm && (
          <Grid item xs={12} md={7} pb={3}>
            <Box display={'flex'} justifyContent={'center'} gap={'35px'}>
              <ServiceInfoWrapper>
                <ZigTypography color={'neutral300'}>
                  {t('assets-in-pool')}
                </ZigTypography>
                <AssetsInPoolWrapper>
                  <AssetsInPool
                    serviceId={service.id}
                    prefixId={'service-profile'}
                    assetsValue={service.investedUSDT}
                    convertedValue={+service.invested}
                    convertedValueCoin={service.ssc}
                  />
                </AssetsInPoolWrapper>
              </ServiceInfoWrapper>
              <ServiceInfoWrapper>
                <ServicePercentageInfo
                  id={'service-profile__pnl30t'}
                  priceLabelSx={{ fontSize: '18px', lineHeight: '28px' }}
                  title={t('marketplace:table.n-months', { count: 1 })}
                  value={service.pnlSsc30t}
                  percent={service.pnlPercent30t}
                  ssc={service.ssc}
                  canShow={
                    +new Date(service.createdAt) < +subMonths(new Date(), 1)
                  }
                />
              </ServiceInfoWrapper>
            </Box>
          </Grid>
        )}
        <Grid
          container
          sx={{ gap: { lg: '75px', xl: '90px' }, flexWrap: { lg: 'nowrap' } }}
        >
          <Grid item xs={12} lg={8}>
            <ServiceGrowthChart service={service} />
            {!lg && (
              <Box paddingTop={3}>
                <ServiceSummary service={service} />
              </Box>
            )}
            {sm && (
              <>
                <ServiceDescription service={service} />
                <ServiceManagerDescription service={service} />
              </>
            )}
          </Grid>
          {lg && (
            <Grid
              item
              xs={12}
              lg={4}
              pt={{ xs: 3, lg: 0 }}
              sx={{
                minWidth: { lg: '422px' },
              }}
            >
              <ServiceSummary service={service} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceProfileContainer;
