import React from 'react';
import { Box } from '@mui/material';
import { CoinIcon, ZigTypography } from '@zignaly-open/ui';

const CoinOption = ({ coin, name }: { coin: string; name: string }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box ml='2px' mr='11px'>
        <CoinIcon size={'small'} coin={coin} name={name} />
      </Box>
      <ZigTypography fontWeight={600}>{coin}</ZigTypography>&nbsp;
      <ZigTypography>{name}</ZigTypography>
    </Box>
  );
};

export default CoinOption;
