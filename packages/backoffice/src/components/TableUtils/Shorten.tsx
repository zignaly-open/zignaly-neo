import { ZigTypography } from '@zignaly-open/ui';
import { Tooltip } from '@mui/material';
import React from 'react';

const Shorten: React.FC<{ text: string; width?: number }> = ({
  text,
  width = 150,
}) => (
  <Tooltip title={text}>
    <ZigTypography
      sx={{
        display: 'block',
        maxWidth: width,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </ZigTypography>
  </Tooltip>
);

export default Shorten;
