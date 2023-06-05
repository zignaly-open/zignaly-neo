import { Box } from '@mui/material';
import { ZigCoinIcon, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { NumericFormat } from 'react-number-format';

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
  <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
    <ZigTypography
      variant={'body2'}
      color='neutral300'
      id={`${idPrefix}__title`}
    >
      {label}
    </ZigTypography>
    <Box display='flex' gap={1}>
      <ZigCoinIcon coin={coin} id={`${idPrefix}__coin-icon`} />
      <Box>
        <ZigTypography variant={'bigNumber'} color={'neutral200'}>
          <NumericFormat
            id={`${idPrefix}__invested`}
            value={value}
            displayType={'text'}
            thousandSeparator={true}
          />
        </ZigTypography>
        <ZigTypography
          variant={'h3'}
          color={'neutral300'}
          fontWeight={400}
          id={`${idPrefix}__coin-name`}
        >
          {String(coin).toUpperCase()}
        </ZigTypography>
      </Box>
    </Box>
  </Box>
);
