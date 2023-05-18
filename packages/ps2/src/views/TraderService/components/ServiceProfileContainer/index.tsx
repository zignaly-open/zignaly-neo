import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { Box, Grid, useMediaQuery } from '@mui/material';
import theme from '../../../../theme';
import RightSideActions from './atoms/RightSideActions';
import ServiceGrowthChart from './atoms/ServiceGrowthChart';
import ServiceDescription from './atoms/ServiceDescription';
import ServiceManagerDescription from './atoms/ServiceManagerDescription';
import ServiceSummary from './atoms/ServiceSummary';

const ServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  // we do not use the results of this till before the modal
  useCoinBalances();
  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        mt: { xs: '-15px', md: '-45px' },
      }}
    >
      <Grid container>
        <Grid item md={1} />
        <Grid item sx={{ display: 'flex' }} xs={12} md={9} pb={{ md: 4 }}>
          <ServiceProfileHeader service={service} />
        </Grid>
        <Grid item xs={12} md={2} pb={4}>
          <RightSideActions service={service} />
        </Grid>
        <Grid
          container
          sx={{ gap: { lg: '75px', xl: '90px' }, flexWrap: { lg: 'nowrap' } }}
        >
          <Grid item xs={12} lg={8}>
            <ServiceGrowthChart service={service} />
            <ServiceDescription service={service} />
            <ServiceManagerDescription service={service} />
          </Grid>
          <Grid
            item
            xs={12}
            lg={4}
            pt={{ sm: 3, lg: 0 }}
            sx={{
              minWidth: { lg: '422px' },
            }}
          >
            <ServiceSummary service={service} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceProfileContainer;
