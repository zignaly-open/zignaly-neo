import { Box, Tooltip, useTheme } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { ZigArrowDescIcon } from '@zignaly-open/ui/icons';
import React from 'react';

export const DescriptionLine = ({
  text,
  tooltip,
  id,
}: {
  text: string;
  tooltip?: string;
  id?: string;
}) => {
  const theme = useTheme();
  return (
    <Box display='flex' alignItems={'center'} gap='15px'>
      <ZigArrowDescIcon color={theme.palette.greenGraph} />
      <Box position={'relative'}>
        <ZigTypography
          color='rgba(255, 255, 255, 0.6)'
          fontSize={16}
          textAlign={'left'}
          lineHeight={'28px'}
          id={id}
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
