import { lazily } from 'react-lazily';
import React, { Suspense } from 'react';
import { Loader } from '@zignaly-open/ui';
import { Box } from '@mui/material';
const { ZigChartMini } = lazily(() => import('@zignaly-open/ui/charts'));

const ZigChartMiniStub = (props: React.ComponentProps<typeof ZigChartMini>) => (
  <Box
    sx={{
      width: 150,
      height: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 10px',
    }}
    {...props}
  >
    <Loader />
  </Box>
);

// Because victory charts is waaay too fat
const ZigChartMiniSuspensed = ({
  stub,
  ...props
}: React.ComponentProps<typeof ZigChartMini> & { stub?: boolean }) => {
  return (
    <Suspense fallback={stub ? <ZigChartMiniStub {...props} /> : null}>
      <ZigChartMini {...props} />
    </Suspense>
  );
};

export default ZigChartMiniSuspensed;
