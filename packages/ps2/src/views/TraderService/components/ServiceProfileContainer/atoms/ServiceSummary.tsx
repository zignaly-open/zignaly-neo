import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Box, Grid } from '@mui/material';
import { GridCell, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import ServicePercentageInfo from './ServicePercentageInfo';
import { subMonths, subYears } from 'date-fns';

const ServiceSummary: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  return (
    <Box>
      <GridWithBottomBorder container pb={2.5} pl={2} pr={2} pt={0}>
        <GridCell item xs={6}>
          <ZigTypography color={'neutral300'}>
            {t('assets-in-pool')}
          </ZigTypography>
          <AssetsInPool
            assetsValue={service.usdtInvested}
            convertedValue={+service.invested}
            convertedValueCoin={service.ssc}
          />
        </GridCell>
        <GridCell item xs={6}>
          <ZigTypography color={'neutral300'}>
            {t('investors-count')}
          </ZigTypography>
          <ZigTypography variant={'h2'} color={'neutral200'}>
            {service.investors}
          </ZigTypography>
        </GridCell>
      </GridWithBottomBorder>
      <GridWithBottomBorder container pb={2.5} pl={2} pr={2} pt={2.5}>
        <GridCell item xs={4} rightBorder>
          <ServicePercentageInfo
            title={t('marketplace:table.n-months', { count: 1 })}
            value={service.pnlSsc30t}
            percent={service.pnlPercent30t}
            ssc={service.ssc}
            canShow={+new Date(service.createdAt) < +subMonths(new Date(), 1)}
          />
        </GridCell>
        <GridCell item xs={4} rightBorder>
          <ServicePercentageInfo
            title={t('marketplace:table.n-months', { count: 3 })}
            value={service.pnlSsc90t}
            ssc={service.ssc}
            percent={service.pnlPercent90t}
            canShow={+new Date(service.createdAt) < +subMonths(new Date(), 3)}
          />
        </GridCell>
        <GridCell item xs={4}>
          <ServicePercentageInfo
            title={t('marketplace:table.n-years', { count: 1 })}
            value={service.pnlSsc365t}
            percent={service.pnlPercent365t}
            ssc={service.ssc}
            canShow={+new Date(service.createdAt) < +subYears(new Date(), 1)}
          />
        </GridCell>
      </GridWithBottomBorder>
      <Grid container p={2}>
        <Grid item xs={6}>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.base-currency')}{' '}
            <ZigTypography fontSize={12} color={'neutral200'}>
              {service.ssc}
            </ZigTypography>
          </ZigTypography>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.funds-allocated')}{' '}
            <ZigTypography fontSize={12} color={'neutral200'}>
              {t('common:percent', { value: +service.fundsAllocated })}
            </ZigTypography>
          </ZigTypography>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.success-fee')}{' '}
            <ZigTypography fontSize={12} color={'neutral200'}>
              {t('common:percent', { value: +service.successFee })}
            </ZigTypography>
          </ZigTypography>
        </Grid>
        <Grid item xs={6}>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.tags')}{' '}
            <ZigTypography fontSize={12} color={'neutral200'}>
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {service.tags?.length ? service.tags?.join(', ') : <>&mdash;</>}
            </ZigTypography>
          </ZigTypography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceSummary;
