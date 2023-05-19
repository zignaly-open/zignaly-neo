import { Box } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import React from 'react';

const LabelValueLine = ({
  prefixId,
  label,
  value,
  coin,
}: {
  label: string;
  value: string;
  coin: string;
  prefixId?: string;
}) => (
  <Box gap={1} display='flex'>
    <ZigTypography
      variant='body2'
      color='neutral200'
      fontWeight={500}
      id={prefixId && `${prefixId}__label`}
    >
      {label}
    </ZigTypography>
    <ZigPriceLabel
      id={prefixId && `${prefixId}__value`}
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
