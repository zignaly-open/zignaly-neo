/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { ZigTypography, ZigLink } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ASCENDEX_URL, GATEIO_URL, MEXC_URL } from 'util/constants';
import { Box, Tooltip } from '@mui/material';

const ExchangesTooltipContent = () => {
  const { t } = useTranslation('wallet');
  return (
    <Box p={1} display='flex' flexDirection='column'>
      {t('buy.buy-exchanges')}
      <ZigLink href={ASCENDEX_URL}>AscendEX &gt;</ZigLink>
      <ZigLink href={MEXC_URL}>MEXC &gt;</ZigLink>
      <ZigLink href={GATEIO_URL}>Gate.io &gt;</ZigLink>
    </Box>
  );
};

const ExchangesTooltip = () => {
  const { t } = useTranslation('wallet');

  return (
    <Tooltip
      leaveDelay={190}
      placement='bottom'
      title={<ExchangesTooltipContent />}
    >
      <ZigTypography color='links'>
        {t('buy.available-exchanges')}
      </ZigTypography>
    </Tooltip>
  );
};

export default ExchangesTooltip;
