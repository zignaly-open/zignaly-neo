import React, { useMemo } from 'react';
import { parse } from 'date-fns';
import {
  GraphChartType,
  GraphTimeframe,
  Service,
} from '../../../../../apis/service/types';
import { ZigButton, ZigChart, ZigSelect } from '@zignaly-open/ui';
import { Box, ButtonGroup } from '@mui/material';
import { useTraderServiceGraphQuery } from '../../../../../apis/service/api';
import { ChartWrapper } from '../styles';
import { formatMonthDay } from '../../../../Dashboard/components/MyDashboard/util';
import { useChartConfig } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const { chartType, chartTimeframe, setChartTimeframe, setChartType } =
    useChartConfig();
  const { data, isLoading, isFetching, isError } = useTraderServiceGraphQuery({
    id: service.id,
    period: chartTimeframe,
    chart: chartType,
  });

  const chartTypeOptions = useMemo(
    () => [
      { label: 'pnl_pct_compound', value: GraphChartType.pnl_pct_compound },
      { label: 'pnl_ssc', value: GraphChartType.pnl_ssc },
    ],
    [],
  );
  const { t } = useTranslation('service');

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mr: 2 }}>
          <ButtonGroup variant={'outlined'}>
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
          </ButtonGroup>
        </Box>
        <ZigSelect
          width={200}
          small
          value={chartType}
          onChange={(v) => setChartType(v)}
          options={chartTypeOptions}
        ></ZigSelect>
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
