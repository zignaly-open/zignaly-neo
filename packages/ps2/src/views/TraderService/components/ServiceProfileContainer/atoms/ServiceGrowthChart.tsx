import React from 'react';
import { parse } from 'date-fns';
import { Service } from '../../../../../apis/service/types';
import { AreaChart } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTraderServiceGraphQuery } from '../../../../../apis/service/api';
import { ChartWrapper } from '../styles';
import { formatMonthDay } from '../../../../Dashboard/components/MyDashboard/util';
import { useChartConfig } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const { chartType, chartTimeframe } = useChartConfig();
  const { data, isLoading, isFetching, isError } = useTraderServiceGraphQuery({
    id: service.id,
    period: chartTimeframe,
    chart: chartType,
  });
  const { t } = useTranslation('service');

  if (isError) {
    return (
      <Stub
        title={t('chart-error.heading')}
        description={t('chart-error.description')}
      />
    );
  }

  return (
    <Box>
      <ChartWrapper>
        {isLoading || isFetching ? (
          <CenteredLoader />
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
    </Box>
  );
};

export default ServiceGrowthChart;
