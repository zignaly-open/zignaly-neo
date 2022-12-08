import React from 'react';
import { Box } from '@mui/material';
import { CoinIcon, ZigTypography } from '@zignaly-open/ui';

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

const CoinOption = ({ coin, name }: { coin: string; name: string }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box mr='11px'>
        <CoinIcon size={'small'} coin={coin} name={name} />
      </Box>
      <ZigTypography fontWeight={600}>{coin}</ZigTypography>&nbsp;
      <ZigTypography>{name}</ZigTypography>
    </Box>
  );
};

export default CoinOption;
