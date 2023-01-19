import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import ChainIcon from 'components/ChainIcon';

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

const ChainOption = ({ network, name }: { network: string; name: string }) => {
  return (
    <Box display='flex' alignItems='center' gap='11px'>
      <ChainIcon network={network} />
      <ZigTypography>{name}</ZigTypography>
    </Box>
  );
};

export default ChainOption;
