import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { useIsServiceOwner } from '../../../../apis/service/use';
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
  const isOwner = useIsServiceOwner(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        pl: md ? 6 : 2,
        pr: md ? 6 : 2,
      }}
      paddingTop={isOwner ? 7 : 0}
    >
      <Grid container>
        <Grid item sx={{ display: 'flex' }} xs={12} md={8} pb={2} pr={[0, 7.5]}>
          <ServiceProfileHeader service={service} />
        </Grid>
        <Grid item xs={12} md={4} pb={2}>
          <RightSideActions service={service} />
        </Grid>
        <Grid item xs={12} md={12} lg={7.6} xl={8} pr={{ md: 0, lg: 7.5 }}>
          <ServiceGrowthChart service={service} />
          <ServiceDescription service={service} />
          <ServiceManagerDescription service={service} />
        </Grid>
        <Grid item xs={12} md={12} lg={4.4} xl={4} pt={{ md: 3, lg: 0 }}>
          <ServiceSummary service={service} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceProfileContainer;
