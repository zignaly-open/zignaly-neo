/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { ASCENDEX_URL, GATEIO_URL, MEXC_URL } from 'util/constants';
import { Box, Link, Tooltip } from '@mui/material';

const ExchangesTooltipContent = () => {
  const { t } = useTranslation('wallet');
  return (
    <Box p={1} display='flex' flexDirection='column'>
      {t('buy.buy-exchanges')}
      <Link href={ASCENDEX_URL} rel='noreferrer' target='_blank'>
        AscendEX &gt;
      </Link>
      <Link href={MEXC_URL} rel='noreferrer' target='_blank'>
        MEXC &gt;
      </Link>
      <Link href={GATEIO_URL} rel='noreferrer' target='_blank'>
        Gate.io &gt;
      </Link>
    </Box>
  );
};

const ExchangesTooltip = () => {
  const { t } = useTranslation('wallet');

  return (
    <Tooltip placement='bottom' title={<ExchangesTooltipContent />}>
      <ZigTypography color='links' style={{ cursor: 'pointer' }}>
        {t('buy.available-exchanges')}
      </ZigTypography>
    </Tooltip>
  );
};

export default ExchangesTooltip;
