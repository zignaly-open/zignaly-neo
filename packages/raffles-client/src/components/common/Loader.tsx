import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: React.FC = () => (
  <Box textAlign={'center'}>
    <CircularProgress />
  </Box>
);

export default Loader;
