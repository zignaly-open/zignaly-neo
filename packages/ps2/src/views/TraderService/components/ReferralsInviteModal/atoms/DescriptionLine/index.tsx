import { ArrowForward } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

export const DescriptionLine = ({ text }: { text: string }) => {
  return (
    <Box display='flex' alignItems={'center'} gap='15px'>
      <ArrowForward sx={{ color: 'greenGraph', width: '15px' }} />
      <ZigTypography
        color='rgba(255, 255, 255, 0.6)'
        fontSize={16}
        textAlign={'left'}
        lineHeight={'28px'}
      >
        {text}
      </ZigTypography>
    </Box>
  );
};
