import React from 'react';
import { parse } from 'date-fns';
import {
  GraphChartType,
  GraphTimeframe,
  Service,
} from '../../../../../apis/service/types';
import { AreaChart } from '@zignaly-open/ui';
import { CircularProgress } from '@mui/material';
import { useTraderServiceGraphQuery } from '../../../../../apis/service/api';
import { ChartWrapper } from '../styles';
import { formatMonthDay } from '../../../../Dashboard/components/MyDashboard/util';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const { data, isLoading, isFetching } = useTraderServiceGraphQuery({
    id: service.id,
    period: GraphTimeframe['7d'],
    chart: GraphChartType.pnl_ssc,
  });

  return null;
  return (
    <ChartWrapper>
      {isLoading || isFetching ? (
        <CircularProgress />
      ) : (
        <AreaChart
          variant={'large'}
          data={Object.entries(data?.data || {}).map(([date, value]) => ({
            x: formatMonthDay(parse(date, 'yyyy-MM-dd', Date.now())),
            y: value,
          }))}
        />
      )}
    </ChartWrapper>
  );
};

export default ServiceGrowthChart;
