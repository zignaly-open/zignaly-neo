import React, { Suspense, useMemo } from 'react';
import {
  GraphChartType,
  GraphTimeframe,
  GraphTimeframeDayLength,
  Service,
} from '../../../../../apis/service/types';
import {
  getPrecisionForCoin,
  ZigButtonGroupInput,
  ZigPriceLabel,
  CenteredLoader,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import {
  ChartWrapper,
  SelectWrapperBox,
  SqueezedButtonGroupWrapper,
} from '../styles';
import { useChartConfig, useChartData } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import PercentChange from './PercentChange';
import { differenceInDays } from 'date-fns';
import { getColorForNumber } from '../../../../../util/numbers';
import { numericFormatter } from 'react-number-format';
import {
  formatCompactNumber,
  formatLocalizedDate,
} from 'views/Dashboard/components/MyDashboard/util';
import BigNumber from 'bignumber.js';
import { lazily } from 'react-lazily';

const { ZigChart } = lazily(() => import('@zignaly-open/ui/charts'));

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const { chartType, chartTimeframe, setChartTimeframe, setChartType } =
    useChartConfig();
  const { data, isLoading, isFetching, isError } = useChartData({
    service,
    chartTimeframe,
    chartType,
  });

  const { t } = useTranslation(['service', 'marketplace']);

  const chartTypeOptions = useMemo(
    () => [
      {
        label: t('chart-options.pnl_pct_compound'),
        value: GraphChartType.pnl_pct_compound,
      },
      {
        label: t('chart-options.pnl_ssc', { coin: service.ssc }),
        value: GraphChartType.pnl_ssc,
      },
      {
        label: t('chart-options.pnl_ssc_percent', { coin: service.ssc }),
        value: GraphChartType.pnl_pct,
      },
      {
        label: t('chart-options.sbt_ssc', { coin: service.ssc }),
        value: GraphChartType.sbt_ssc,
      },
      { label: t('chart-options.investors'), value: GraphChartType.investors },
    ],
    [t],
  );

  const serviceStartedDaysAgo = useMemo(
    () => differenceInDays(new Date(), new Date(service.createdAt)),
    [service.createdAt],
  );

  const events = useMemo(() => {
    // yes, we intentionally skip the case when the migration date is 0 index
    const allEvents = [];
    if (data?.migrationIndex > 0) {
      allEvents.push({ x: data?.migrationIndex, label: t('migrated-to-ps2') });
      return allEvents;
    }
  }, [data?.migrationIndex]);

  const canShowSummary =
    typeof data?.summary !== 'undefined' &&
    !isError &&
    !isLoading &&
    !isFetching;
  const value = data?.summary;

  const isPercent = [
    GraphChartType.pnl_pct_compound,
    GraphChartType.at_risk_pct,
    GraphChartType.pnl_pct,
  ].includes(chartType);

  const precision = isPercent ? 2 : getPrecisionForCoin(service.ssc) ?? 8;

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          minHeight: 40,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: !sm && '5px',
        }}
      >
        {canShowSummary && (
          <>
            <Box sx={{ mr: sm && 2, order: !sm && 2, ml: !sm && 'auto' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {![
                  GraphChartType.pnl_pct_compound,
                  GraphChartType.at_risk_pct,
                  GraphChartType.investors,
                ].includes(chartType) && (
                  <>
                    {[GraphChartType.pnl_ssc, GraphChartType.pnl_pct].includes(
                      chartType,
                    ) && (
                      <ZigTypography
                        color={'neutral200'}
                        variant={'h1'}
                        sx={{ mr: 0.5, mb: 0, position: 'relative' }}
                        id={'service-profile__amount-total-label'}
                      >
                        {t('service:total')}
                      </ZigTypography>
                    )}
                    <ZigPriceLabel
                      id={'service-profile__amount-total'}
                      precision={precision}
                      shorten
                      coin={service.ssc}
                      variant={'bigNumber'}
                      color={
                        chartType === GraphChartType.sbt_ssc
                          ? 'neutral200'
                          : +value > 0
                          ? 'greenGraph'
                          : 'redGraphOrError'
                      }
                      value={value}
                      coinProps={{
                        paddingTop: '6px',
                      }}
                    />
                  </>
                )}

                {[
                  GraphChartType.pnl_pct_compound,
                  GraphChartType.at_risk_pct,
                ].includes(chartType) && (
                  <ZigTypography
                    variant={sm ? 'bigNumber' : 'h2'}
                    sx={{ whiteSpace: 'nowrap' }}
                    color={getColorForNumber(value)}
                    id={'service-profile__percent-change'}
                  >
                    {t('common:percent', { value })}
                  </ZigTypography>
                )}

                {GraphChartType.investors === chartType && (
                  <ZigTypography
                    color={'neutral200'}
                    variant={'h1'}
                    sx={{ whiteSpace: 'nowrap' }}
                    id={'service-profile__investors'}
                  >
                    {t('marketplace:table:x-investors', {
                      count: +value,
                    })}
                  </ZigTypography>
                )}
              </Box>
            </Box>

            {typeof data?.percentDiff !== 'undefined' && (
              <PercentChange
                sx={{ mr: 2 }}
                id={'service-profile__percent-change'}
                value={data?.percentDiff}
              />
            )}
          </>
        )}

        <SqueezedButtonGroupWrapper
          sx={{ mr: sm && 3, order: !sm && 1, ml: sm && 'auto' }}
        >
          <ZigButtonGroupInput
            options={Object.keys(GraphTimeframe).map(
              (v: GraphTimeframe, i, all) => {
                const isDisabled =
                  i > 0 &&
                  GraphTimeframeDayLength[v] > 30 &&
                  GraphTimeframeDayLength[all[i - 1]] > serviceStartedDaysAgo;

                return {
                  value: v,
                  label: t(`periods.${v}`),
                  id: `service-profile__choose-period-${v}`,
                  extraProps: {
                    sx: { padding: !md && '0 !important' },
                    size: 'small',
                    disabled: isDisabled,
                    tooltip: isDisabled
                      ? t('service:not-enough-data')
                      : t(`periods.${v}-full`),
                  },
                };
              },
            )}
            value={chartTimeframe}
            onChange={(v: GraphTimeframe) => setChartTimeframe(v)}
          />
        </SqueezedButtonGroupWrapper>
        {sm && (
          <SelectWrapperBox>
            <ZigSelect
              id={'service-profile__choose-graph-view'}
              outlined
              width={170}
              small
              value={chartType}
              onChange={(v) => setChartType(v)}
              options={chartTypeOptions}
            />
          </SelectWrapperBox>
        )}
      </Box>

      <ChartWrapper>
        {isError ? (
          <Stub
            id={'service-profile__error-load'}
            title={t('chart-error.heading')}
            description={t('chart-error.description')}
          />
        ) : isLoading || isFetching || !data?.data ? (
          <CenteredLoader />
        ) : (
          <Box width={lg || !sm ? '100%' : '90%'}>
            <Suspense fallback={<CenteredLoader />}>
              <ZigChart
                id={'service-profile__graph'}
                bars={[GraphChartType.pnl_ssc, GraphChartType.pnl_pct].includes(
                  chartType,
                )}
                onlyIntegerTicks={chartType === GraphChartType.investors}
                events={events}
                yAxisFormatter={(v) =>
                  `${formatCompactNumber(
                    v,
                    isPercent || chartType === GraphChartType.investors
                      ? 2
                      : getPrecisionForCoin(service.ssc),
                  )}${isPercent ? `%` : ``}`
                }
                data={data?.data}
                tooltipFormatter={(v) =>
                  `${formatLocalizedDate(
                    (v as typeof v & { date?: Date }).date,
                    'PP',
                  )}\n${numericFormatter(new BigNumber(v.y).toFormat(), {
                    ...(isPercent
                      ? {
                          decimalScale: 2,
                          suffix: '%',
                        }
                      : {
                          thousandSeparator: true,
                          decimalScale: getPrecisionForCoin(service.ssc) ?? 8,
                          suffix:
                            chartType === GraphChartType.investors
                              ? ''
                              : ` ${service.ssc}`,
                        }),
                  })}`
                }
                precision={precision}
              />
            </Suspense>
          </Box>
        )}
      </ChartWrapper>
    </Box>
  );
};

export default ServiceGrowthChart;
