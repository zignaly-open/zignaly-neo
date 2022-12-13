import React, { useMemo } from 'react';
import {
  GraphChartType,
  GraphTimeframe,
  GraphTimeframeDayLength,
  Service,
} from '../../../../../apis/service/types';
import {
  ZigButton,
  ZigChart,
  ZigPriceLabel,
  ZigSelect,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import {
  ChartWrapper,
  GraphPercentageWrapperBox,
  SqueezedButtonGroup,
} from '../styles';
import { useChartConfig, useChartData } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';
import PercentChange from './PercentChange';
import { differenceInDays } from 'date-fns';

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
      {
        label: t('chart-options.at_risk_pct'),
        value: GraphChartType.at_risk_pct,
      },
      { label: t('chart-options.investors'), value: GraphChartType.investors },
    ],
    [t],
  );

  const serviceStartedDaysAgo = useMemo(
    () => differenceInDays(new Date(service.createdAt), new Date()),
    [service.createdAt],
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          minHeight: 40,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {typeof data?.summary !== 'undefined' &&
          !isError &&
          !isLoading &&
          !isFetching && (
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
                  ].includes(chartType) ? (
                    <ZigPriceLabel
                      coin={service.ssc}
                      variant={'bigNumber'}
                      color={
                        +data?.summary > 0 ? 'greenGraph' : 'redGraphOrError'
                      }
                      value={data?.summary}
                    />
                  ) : (
                    <ZigTypography
                      variant={'bigNumber'}
                      color={
                        +data?.summary > 0 ? 'greenGraph' : 'redGraphOrError'
                      }
                    >
                      {chartType === GraphChartType.investors
                        ? t('marketplace:table:x-investors', {
                            count: +data?.summary,
                          })
                        : t('common:percent', { value: data?.summary })}
                    </ZigTypography>
                  )}
                </Box>
              </Box>

              {![
                GraphChartType.pnl_pct_compound,
                GraphChartType.at_risk_pct,
                GraphChartType.investors,
              ].includes(chartType) && (
                <GraphPercentageWrapperBox sx={{ mr: 2 }}>
                  <PercentChange
                    colored
                    variant='h2'
                    value={data?.summaryPct}
                  />
                </GraphPercentageWrapperBox>
              )}
            </>
          )}

        <Box sx={{ flex: 1 }} />
        <Box sx={{ mr: 2 }}>
          <SqueezedButtonGroup variant={'outlined'}>
            {Object.keys(GraphTimeframe).map((v: GraphTimeframe, i, all) => {
              const isDisabled =
                i > 0 &&
                GraphTimeframeDayLength[v] > 30 &&
                GraphTimeframeDayLength[all[i - 1]] > serviceStartedDaysAgo;

              return (
                <ZigButton
                  active={v === chartTimeframe}
                  size={'small'}
                  variant={'outlined'}
                  key={v}
                  disabled={isDisabled}
                  tooltip={
                    isDisabled ? t('service:not-enough-data') : undefined
                  }
                  onClick={() => setChartTimeframe(v)}
                >
                  {t('periods.' + v)}
                </ZigButton>
              );
            })}
          </SqueezedButtonGroup>
        </Box>
        <Box sx={{ mr: 4.5 }}>
          <ZigSelect
            outlined
            width={180}
            small
            value={chartType}
            onChange={(v) => setChartType(v)}
            options={chartTypeOptions}
          />
        </Box>
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
