import { lazily } from 'react-lazily';
import React, { Suspense } from 'react';
import { Loader } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { ZigChartMini } from '@zignaly-open/ui/charts';

// const { ZigChartMini } = lazily(() => import('@zignaly-open/ui/charts'));

const ZigChartMiniStub = (
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
  >
    <Loader />
  </Box>
);

// Because victory charts is waaay too fat
const ZigChartMiniSuspensed: typeof ZigChartMini = (props) => {
  return (
    <Suspense fallback={ZigChartMiniStub}>
      <ZigChartMini {...props} />
    </Suspense>
  );
};

export default ZigChartMiniSuspensed;
