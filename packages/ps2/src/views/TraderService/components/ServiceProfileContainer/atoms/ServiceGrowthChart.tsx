import React from 'react';
import { parse } from 'date-fns';
import { GraphTimeframe, Service } from '../../../../../apis/service/types';
import { AreaChart, ZigButton } from '@zignaly-open/ui';
import { Box, ButtonGroup } from '@mui/material';
import { useTraderServiceGraphQuery } from '../../../../../apis/service/api';
import { ChartWrapper } from '../styles';
import { formatMonthDay } from '../../../../Dashboard/components/MyDashboard/util';
import { useChartConfig } from '../../../../../apis/service/use';
import Stub from '../../../../../components/Stub';
import { useTranslation } from 'react-i18next';
import CenteredLoader from '../../../../../components/CenteredLoader';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  const { chartType, chartTimeframe, setChartTimeframe } = useChartConfig();
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
    <ChartWrapper>
      <Box sx={{ mt: 2, mb: 1 }}>
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
        {/*<ZigSelect*/}
        {/*  label={''}*/}
        {/*  value={chartType}*/}
        {/*  onChange={(v) => setChartType(v)}*/}
        {/*  options={chartTypeOptions}*/}
        {/*></ZigSelect>*/}
      </Box>
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
  );
};

export default ServiceGrowthChart;
