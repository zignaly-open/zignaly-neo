import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';
import { InnerGrid } from './styles';

// TODO: put it into zignaly-ui
const CenteredContainer: React.FC<{
  children: ReactElement;
  innerWidth?: number;
}> = ({ children }) => (
  <Grid
    container
    spacing={0}
    direction='column'
    alignItems='center'
    justifyContent='center'
    style={{ minHeight: '100vh', padding: '50px 30px' }}
  >
    <InnerGrid item xs={12}>
      {children}
    </InnerGrid>
  </Grid>
);

export default CenteredContainer;
