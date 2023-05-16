import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { ZigTypography, ZigUserIcon } from '@zignaly-open/ui';
import { Box, Grid } from '@mui/material';
import { GridCell, AssetsInPoolWrapper, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import ServicePercentageInfo from './ServicePercentageInfo';
import { subMonths, subYears } from 'date-fns';
import { numericFormatter } from 'react-number-format';

const SBT_UNLIMITED = 1000000000;

const ServiceSummary: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  return (
    <Box>
      <GridWithBottomBorder container pb={2.5} pt={0}>
        <GridCell item xs={6}>
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
        </GridCell>
        <GridCell item xs={6}>
          <ZigTypography color={'neutral300'}>
            {t('investors-count')}
          </ZigTypography>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={1}
          >
            <ZigTypography
              variant={'h2'}
              color={'neutral200'}
              id={'service-profile__investors'}
            >
              {service.investors}
            </ZigTypography>
            <ZigUserIcon color={'#65647E'} width={'16px'} />
          </Box>
        </GridCell>
      </GridWithBottomBorder>
      <GridWithBottomBorder container pb={2.5} pt={2.5}>
        <GridCell item xs={4} rightBorder px={1}>
          <ServicePercentageInfo
            id={'service-profile__pnl30t'}
            title={t('marketplace:table.n-months', { count: 1 })}
            value={service.pnlSsc30t}
            percent={service.pnlPercent30t}
            ssc={service.ssc}
            canShow={+new Date(service.createdAt) < +subMonths(new Date(), 1)}
          />
        </GridCell>
        <GridCell item xs={4} rightBorder px={1}>
          <ServicePercentageInfo
            id={'service-profile__pnl90t'}
            title={t('marketplace:table.n-months', { count: 3 })}
            value={+service.pnlSsc90t}
            ssc={service.ssc}
            percent={service.pnlPercent90t}
            canShow={+new Date(service.createdAt) < +subMonths(new Date(), 3)}
          />
        </GridCell>
        <GridCell item xs={4} px={1}>
          <ServicePercentageInfo
            id={'service-profile__pnl365t'}
            title={t('marketplace:table.n-years', { count: 1 })}
            value={service.pnlSsc365t}
            percent={service.pnlPercent365t}
            ssc={service.ssc}
            canShow={+new Date(service.createdAt) < +subYears(new Date(), 1)}
          />
        </GridCell>
      </GridWithBottomBorder>
      <Grid container py={2}>
        <Grid item xs={6}>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.base-currency')}{' '}
            <ZigTypography
              fontSize={12}
              color={'neutral200'}
              id={'service-profile__base-currency'}
            >
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
            <ZigTypography
              fontSize={12}
              color={'neutral200'}
              id={'service-profile__funds-allocated'}
            >
              {service.maximumSbt >= SBT_UNLIMITED
                ? t('summary.no-max-limit')
                : t('common:percent', {
                    value: numericFormatter(service.fundsAllocated, {
                      thousandSeparator: true,
                      decimalScale: 2,
                    }),
                  })}
            </ZigTypography>
          </ZigTypography>
          <ZigTypography
            fontSize={12}
            color={'neutral300'}
            sx={{ mt: 0.5 }}
            component={'p'}
          >
            {t('summary.success-fee')}{' '}
            <ZigTypography
              fontSize={12}
              color={'neutral200'}
              id={'service-profile__success-fee'}
            >
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
            <ZigTypography
              fontSize={12}
              color={'neutral200'}
              id={'service-profile__tags'}
            >
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
