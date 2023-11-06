import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { trimZeros, ZigTypography, ZigUserIcon } from '@zignaly-open/ui';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { GridCell, AssetsInPoolWrapper, GridWithBottomBorder } from '../styles';
import AssetsInPool from '../../../../../components/AssetsInPool';
import ServicePercentageInfo from './ServicePercentageInfo';
import { subMonths, subYears } from 'date-fns';
import { numericFormatter } from 'react-number-format';

const ServiceSummary: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation(['service', 'marketplace']);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      {sm && (
        <>
          <GridWithBottomBorder container pb={2.5} pt={0}>
            <GridCell item xs={6}>
              <ZigTypography color={'neutral300'} sx={{ mb: '10px' }}>
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
              <ZigTypography color={'neutral300'} sx={{ mb: '10px' }}>
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
                <ZigUserIcon
                  color={theme.palette.backgrounds.investorsIcon}
                  height='13px'
                  width={'12px'}
                />
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
                canShow={
                  +new Date(service.createdAt) < +subMonths(new Date(), 1)
                }
              />
            </GridCell>
            <GridCell item xs={4} rightBorder px={1}>
              <ServicePercentageInfo
                id={'service-profile__pnl90t'}
                title={t('marketplace:table.n-months', { count: 3 })}
                value={+service.pnlSsc90t}
                ssc={service.ssc}
                percent={service.pnlPercent90t}
                canShow={
                  +new Date(service.createdAt) < +subMonths(new Date(), 3)
                }
              />
            </GridCell>
            <GridCell item xs={4} px={1}>
              <ServicePercentageInfo
                id={'service-profile__pnl365t'}
                title={t('marketplace:table.n-years', { count: 1 })}
                value={service.pnlSsc365t}
                percent={service.pnlPercent365t}
                ssc={service.ssc}
                canShow={
                  +new Date(service.createdAt) < +subYears(new Date(), 1)
                }
              />
            </GridCell>
          </GridWithBottomBorder>
        </>
      )}

      <Grid container py={2} mb={!sm && '25px'}>
        <Grid item xs={sm ? 6 : 12}>
          {!sm && (
            <ZigTypography
              fontSize={12}
              color={'neutral300'}
              sx={{ mt: 0.5 }}
              component={'p'}
            >
              {t('investors-count')}
              {': '}
              <ZigTypography
                fontSize={12}
                color={'neutral200'}
                id={'service-profile__investors-count'}
                mr={'3px'}
              >
                {service.investors}
              </ZigTypography>
              <ZigUserIcon
                color={theme.palette.backgrounds.investorsIcon}
                height='9px'
                width={'9px'}
              />
            </ZigTypography>
          )}

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
              whiteSpace={'nowrap'}
            >
              {Number(service?.fundsAllocated) < 10
                ? `${trimZeros(
                    numericFormatter(
                      (+service?.invested + service?.pending).toString(),
                      {
                        thousandSeparator: true,
                        decimalScale: 2,
                      },
                    ),
                  )} ${service?.ssc || 'USDT'}`
                : t('common:percent', {
                    value: trimZeros(
                      numericFormatter(service?.fundsAllocated, {
                        thousandSeparator: true,
                        decimalScale: 2,
                      }),
                    ),
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
