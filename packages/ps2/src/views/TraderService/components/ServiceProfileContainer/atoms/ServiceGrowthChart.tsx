import React, { useMemo } from 'react';
import {
  GraphChartType,
  GraphTimeframe,
  GraphTimeframeDayLength,
  Service,
} from '../../../../../apis/service/types';
import {
  ZigButtonGroupInput,
  ZigChart,
  ZigPriceLabel,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import {
  ChartWrapper,
  GraphPercentageWrapperBox,
  SelectWrapperBox,
  SqueezedButtonGroupWrapper,
} from '../styles';
import { useChartConfig, useChartData } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';
import PercentChange from './PercentChange';
import { differenceInDays } from 'date-fns';
import { getColorForNumber } from '../../../../../util/numbers';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
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
        }}
      >
        {canShowSummary && (
          <>
            <Box sx={{ mr: 2 }}>
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
                    {chartType === GraphChartType.pnl_ssc && (
                      <ZigTypography
                        color={'neutral200'}
                        variant={'h1'}
                        sx={{ mr: 0.5, position: 'relative', top: '1px' }}
                      >
                        {t('service:total')}
                      </ZigTypography>
                    )}
                    <ZigPriceLabel
                      coin={service.ssc}
                      variant={'bigNumber'}
                      shorten
                      color={
                        chartType === GraphChartType.sbt_ssc
                          ? 'neutral200'
                          : +value > 0
                          ? 'greenGraph'
                          : 'redGraphOrError'
                      }
                      value={value}
                    />
                  </>
                )}

                {[
                  GraphChartType.pnl_pct_compound,
                  GraphChartType.at_risk_pct,
                ].includes(chartType) && (
                  <ZigTypography
                    variant={'bigNumber'}
                    sx={{ whiteSpace: 'nowrap' }}
                    color={getColorForNumber(value)}
                  >
                    {t('common:percent', { value })}
                  </ZigTypography>
                )}

                {GraphChartType.investors === chartType && (
                  <ZigTypography
                    color={'neutral200'}
                    variant={'h1'}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t('marketplace:table:x-investors', {
                      count: +value,
                    })}
                  </ZigTypography>
                )}
              </Box>
            </Box>

            {typeof data?.percentDiff !== 'undefined' && (
              <GraphPercentageWrapperBox sx={{ mr: 2 }}>
                <PercentChange colored variant='h2' value={data?.percentDiff} />
              </GraphPercentageWrapperBox>
            )}
          </>
        )}

        <Box sx={{ flex: 1 }} />

        <SqueezedButtonGroupWrapper sx={{ mr: 2 }}>
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
                  extraProps: {
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
        <SelectWrapperBox>
          <ZigSelect
            outlined
            width={170}
            small
            value={chartType}
            onChange={(v) => setChartType(v)}
            options={chartTypeOptions}
          />
        </SelectWrapperBox>
      </Box>

      <ChartWrapper>
        {isError ? (
          <Stub
            title={t('chart-error.heading')}
            description={t('chart-error.description')}
          />
        ) : isLoading || isFetching || !data?.data ? (
          <CenteredLoader />
        ) : (
          <ZigChart
            bars={chartType === GraphChartType.pnl_ssc}
            onlyIntegerTicks={chartType === GraphChartType.investors}
            events={events}
            yAxisFormatter={(v) =>
              `${v
                .toString()
                .replace(/000000$/, 'M')
                .replace(/000$/, 'K')}${
                [
                  GraphChartType.pnl_pct_compound,
                  GraphChartType.at_risk_pct,
                ].includes(chartType)
                  ? `%`
                  : ``
              }`
            }
            data={data?.data}
          />
        )}
      </ChartWrapper>
    </Box>
  );
};

export default ServiceGrowthChart;
