import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { Box, Grid } from '@mui/material';
import { GridCell, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import PercentChange from './PercentChange';

const ServiceSummary: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  return (
    <Box mt={4}>
      <GridWithBottomBorder container p={2}>
        <GridCell item xs={6}>
          <ZigTypography>{t('assets-in-pool')}</ZigTypography>
          <AssetsInPool
            assetsValue={service.usdtInvested}
            convertedValue={+service.invested}
            convertedValueCoin={service.ssc}
          />
        </GridCell>
        <GridCell item xs={6}>
          <ZigTypography>{t('investors-count')}</ZigTypography>
          <ZigTypography variant={'h2'}>{service.investors}</ZigTypography>
        </GridCell>
      </GridWithBottomBorder>
      <GridWithBottomBorder container p={2}>
        <GridCell item xs={4}>
          <ZigTypography>
            {t('marketplace:table.n-months', { count: 1 })}
          </ZigTypography>

          <ZigPriceLabel
            component='div'
            variant={'h1'}
            color={+service.pnlSsc30t > 0 ? 'greenGraph' : 'redGraphOrError'}
            value={service.pnlSsc30t}
            coin={service.ssc}
          />
          <PercentChange value={service.pnlPercent30t} />
        </GridCell>
        <GridCell item xs={4}>
          <ZigTypography>
            {t('marketplace:table.n-months', { count: 3 })}
          </ZigTypography>
          <ZigPriceLabel
            component='div'
            variant={'h1'}
            color={+service.pnlSsc90t > 0 ? 'greenGraph' : 'redGraphOrError'}
            value={service.pnlSsc90t}
            coin={service.ssc}
          />
          <PercentChange value={service.pnlPercent90t} />
        </GridCell>
        <GridCell item xs={4}>
          <ZigTypography>
            {t('marketplace:table.n-years', { count: 1 })}
          </ZigTypography>
          <ZigPriceLabel
            component='div'
            variant={'h1'}
            color={+service.pnlSsc365t > 0 ? 'greenGraph' : 'redGraphOrError'}
            value={service.pnlSsc365t}
            coin={service.ssc}
          />
          <PercentChange value={service.pnlPercent365t} />
        </GridCell>
      </GridWithBottomBorder>
      <Grid container p={2}>
        <Grid item xs={6}>
          <ZigTypography sx={{ mt: 1 }} component={'p'}>
            {t('summary.base-currency')}{' '}
            <ZigTypography color={'almostWhite'}>{service.ssc}</ZigTypography>
          </ZigTypography>
          <ZigTypography sx={{ mt: 1 }} component={'p'}>
            {t('summary.funds-allocated')}{' '}
            <ZigTypography color={'almostWhite'}>
              {t('common:percent', { value: +service.fundsAllocated })}
            </ZigTypography>
          </ZigTypography>
          <ZigTypography sx={{ mt: 1 }} component={'p'}>
            {t('summary.success-fee')}{' '}
            <ZigTypography color={'almostWhite'}>
              {t('common:percent', { value: +service.successFee })}
            </ZigTypography>
          </ZigTypography>
        </Grid>
        <Grid item xs={6}>
          <ZigTypography sx={{ mt: 1 }} component={'p'}>
            {t('summary.tags')}{' '}
            {service.tags?.length ? (
              <ZigTypography color={'almostWhite'}>
                {service.tags?.join(', ')}
              </ZigTypography>
            ) : (
              // eslint-disable-next-line i18next/no-literal-string
              <ZigTypography color={'neutral400'}>&mdash;</ZigTypography>
            )}
          </ZigTypography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceSummary;
