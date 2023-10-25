import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        mt: { xs: '-15px', md: '-45px' },
      }}
    >
      <Grid container>
        <Grid item sx={{ display: 'flex' }} xs={12} md={7} pb={{ md: 4 }}>
          <ServiceProfileHeader service={service} />
        </Grid>
        <Grid item xs={12} md={5} pb={4}>
          <RightSideActions service={service} />
        </Grid>
        <Grid
          container
          sx={{ gap: { lg: '75px', xl: '90px' }, flexWrap: { lg: 'nowrap' } }}
        >
          <Grid item xs={12} lg={8}>
            <ServiceGrowthChart service={service} />
            {!lg && (
              <Box paddingTop={3}>
                <ServiceSummary service={service} />
              </Box>
            )}
            {sm && (
              <>
                <ServiceDescription service={service} />
                <ServiceManagerDescription service={service} />
              </>
            )}
          </Grid>
          {lg && (
            <Grid
              item
              xs={12}
              lg={4}
              pt={{ xs: 3, lg: 0 }}
              sx={{
                minWidth: { lg: '422px' },
              }}
            >
              <ServiceSummary service={service} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceProfileContainer;
