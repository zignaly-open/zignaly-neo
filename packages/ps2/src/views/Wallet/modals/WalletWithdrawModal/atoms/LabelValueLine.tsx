import { Box } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import React from 'react';

const LabelValueLine = ({
  label,
  value,
  coin,
}: {
  label: string;
  value: string;
  coin: string;
}) => (
  <Box gap={1} display='flex'>
    <ZigTypography variant='body2' color='neutral200' fontWeight={500}>
      {label}
    </ZigTypography>
    <ZigPriceLabel
      value={value}
      variant='body2'
      color='neutral000'
      precision={8}
      fontWeight={500}
      coin={coin}
      coinProps={{
        color: 'neutral000',
        fontWeight: 500,
      }}
    />
  </Box>
);

export default LabelValueLine;
