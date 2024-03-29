import React from 'react';
import { Box } from '@mui/material';
import { ZigCoinIcon, ZigTypography } from '@zignaly-open/ui';

export const filterOptions = (
  option: {
    label: string;
    value: string;
    data: { name: string; label: string; value: string };
  },
  input: string,
) => {
  if (input) {
    const lowerInput = input.toLowerCase();
    return (
      option.value.toLowerCase().includes(lowerInput) ||
      option.data.name.toLowerCase().includes(lowerInput)
    );
  }
  return true;
};

const CoinOption = ({
  coin,
  name,
  prefixId,
}: {
  coin: string;
  name: string;
  prefixId?: string;
}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      id={prefixId && `${prefixId}__${coin.toLowerCase()}`}
    >
      <Box mr='11px' mt={'4px'}>
        <ZigCoinIcon
          size={'small'}
          coin={coin}
          id={prefixId && `${prefixId}__coin-icon-${coin.toLowerCase()}`}
        />
      </Box>
      <ZigTypography
        fontWeight={600}
        id={prefixId && `${prefixId}__coin-${coin.toLowerCase()}`}
      >
        {coin}
      </ZigTypography>
      &nbsp;
      <ZigTypography
        id={prefixId && `${prefixId}__coin-network-${coin.toLowerCase()}`}
      >
        {name}
      </ZigTypography>
    </Box>
  );
};

export default CoinOption;
