import React, { useMemo } from 'react';
import { parse } from 'date-fns';
import {
  GraphChartType,
  GraphTimeframe,
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
import { useTraderServiceGraphQuery } from '../../../../../apis/service/api';
import {
  ChartWrapper,
  GraphPercentageWrapperBox,
  SqueezedButtonGroup,
} from '../styles';
import { formatMonthDay } from '../../../../Dashboard/components/MyDashboard/util';
import { useChartConfig } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';
import PercentChange from './PercentChange';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const { chartType, chartTimeframe, setChartTimeframe, setChartType } =
    useChartConfig();
  const { data, isLoading, isFetching, isError } = useTraderServiceGraphQuery({
    id: service.id,
    period: chartTimeframe,
    chart: chartType,
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
            {Object.keys(GraphTimeframe).map((v: GraphTimeframe) => (
              <ZigButton
                size={'small'}
                variant={v === chartTimeframe ? 'contained' : 'outlined'}
                key={v}
                onClick={() => setChartTimeframe(v)}
              >
                {t('periods.' + v)}
              </ZigButton>
            ))}
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
              [
                GraphChartType.pnl_pct_compound,
                GraphChartType.at_risk_pct,
              ].includes(chartType)
                ? `${v}%`
                : `${v}`
            }
            data={Object.entries(data?.data || {}).map(([date, value]) => ({
              x: formatMonthDay(parse(date, 'yyyy-MM-dd', Date.now())),
              y: value,
            }))}
          />
        )}
      </ChartWrapper>
    </Box>
  );
};

export default ServiceGrowthChart;
