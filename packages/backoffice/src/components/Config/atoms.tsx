import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const SectionHeader: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <Box sx={{ mt: 8, mb: 3 }}>
    <ZigTypography variant={'h2'}>{title}</ZigTypography>
    <ZigTypography sx={{ mt: 1 }}>{description}</ZigTypography>
  </Box>
);
