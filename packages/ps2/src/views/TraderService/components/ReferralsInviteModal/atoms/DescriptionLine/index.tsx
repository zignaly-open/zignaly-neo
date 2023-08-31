import { ArrowForward } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

export const DescriptionLine = ({
  text,
  tooltip,
}: {
  text: string;
  tooltip?: string;
}) => {
  return (
    <Box display='flex' alignItems={'center'} gap='15px'>
      <ArrowForward sx={{ color: 'greenGraph', width: '15px' }} />
      <Box position={'relative'}>
        <ZigTypography
          color='rgba(255, 255, 255, 0.6)'
          fontSize={16}
          textAlign={'left'}
          lineHeight={'28px'}
        >
          {text}
        </ZigTypography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <Box
              component='img'
              sx={{
                position: 'absolute',
                width: '10px',
                right: -12,
                top: -2,
                zIndex: 1,
              }}
              src={`/images/portfolio/info-icon.svg`}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
