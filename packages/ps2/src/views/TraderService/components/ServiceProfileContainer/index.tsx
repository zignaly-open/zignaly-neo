import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useCoinBalances } from '../../../../apis/coin/use';
import ServiceProfileHeader from './atoms/ServiceProfileHeader';
import { useIsServiceOwner } from '../../../../apis/service/use';
import { Box, Grid, useMediaQuery } from '@mui/material';
import theme from '../../../../theme';
import RightSideActions from './atoms/RightSideActions';

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
        pl: md ? 6 : 2,
        pr: md ? 6 : 2,
      }}
      paddingTop={isOwner ? 7 : 0}
    >
      <Grid container>
        <Grid item xs={12} md={9}>
          <ServiceProfileHeader service={service} />
        </Grid>
        <Grid item xs={12} md={3}>
          <RightSideActions service={service} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceProfileContainer;
