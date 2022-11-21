import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { AreaChart } from '@zignaly-open/ui';

const ServiceGrowthChart: React.FC<{ service: Service }> = ({ service }) => {
  console.error(service);
  return (
    <AreaChart
      variant={'large'}
      data={[
        { x: 'Jul 1', y: 10 },
        { x: 'Jul 2', y: 15 },
        { x: 'Jul 3', y: 18 },
        { x: 'Jul 4', y: 19 },
        { x: 'Jul 5', y: 21 },
        { x: 'Jul 6', y: 16 },
        { x: 'Jul 7', y: 18 },
        { x: 'Jul 9', y: 22 },
        { x: 'Jul 10', y: 20 },
        { x: 'Jul 11', y: 22 },
        { x: 'Jul 12', y: 30 },
      ]}
    />
  );
};

export default ServiceGrowthChart;
