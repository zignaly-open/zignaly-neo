import { ZigTypography } from '@zignaly-open/ui';
import { Tooltip, TypographyProps } from '@mui/material';
import React from 'react';

const Shorten: React.FC<{
  text: string;
  width?: number;
  breakLines?: boolean;
  typographyProps?: TypographyProps;
}> = ({ text, typographyProps, breakLines = true, width = 150 }) => (
  <Tooltip title={text}>
    <ZigTypography
      {...(typographyProps || {})}
      sx={{
        display: 'block',
        maxWidth: width,
        ...(breakLines
          ? {
              wordBreak: 'break-all',
              whiteSpace: 'normal',
            }
          : {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }),
        ...(typographyProps?.sx || {}),
      }}
    >
      {text}
    </ZigTypography>
  </Tooltip>
);

export default Shorten;
