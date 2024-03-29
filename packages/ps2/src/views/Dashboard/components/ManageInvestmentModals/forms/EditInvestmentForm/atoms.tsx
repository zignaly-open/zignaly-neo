import { Box } from '@mui/material';
import { ZigPriceLabel, ZigTypography, ZigCoinIcon } from '@zignaly-open/ui';
import React from 'react';

export const AmountInvested = ({
  idPrefix,
  coin,
  value,
  label,
}: {
  idPrefix: string;
  coin: string;
  value: string | number;
  label: string;
}) => (
  <Box display='flex' flexDirection='column' alignItems='center' gap={1.75}>
    <ZigTypography
      variant={'body2'}
      color='neutral300'
      id={idPrefix && `${idPrefix}__invested-label`}
      textAlign='center'
    >
      {label}
    </ZigTypography>
    <Box display='flex' gap={1}>
      <ZigCoinIcon size='small' coin={coin} id={`${idPrefix}__coin-icon`} />
      <ZigPriceLabel
        value={value}
        coin={String(coin).toUpperCase()}
        coinProps={{
          variant: 'h3',
          color: 'neutral300',
          fontWeight: 400,
          display: 'block',
          margin: 0,
        }}
        variant={'bigNumber'}
        color={'neutral200'}
        lineHeight='30px'
        flexDirection='column'
        id={idPrefix && `${idPrefix}__invested-amount`}
      />
    </Box>
  </Box>
);
