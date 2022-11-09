import React from 'react';
import { Icon, PriceBoxOverride } from './styles';
import { AssetsInPoolProps } from './types';
import { Typography, UsdPriceLabel, WhaleIcon } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AssetsInPool = ({
  assetsValue,
  numberOfInvestors,
}: AssetsInPoolProps) => {
  const { t } = useTranslation('marketplace');
  return (
    <Box justifyContent='center' sx={{ gap: 2 }}>
      <PriceBoxOverride
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <UsdPriceLabel value={assetsValue} />
        {+assetsValue >= 200000 && (
          <Icon>
            <WhaleIcon />
          </Icon>
        )}
      </PriceBoxOverride>
      <Box justifyContent='center' alignItems='start'>
        <Typography variant='h5' color='neutral400'>
          {t('table.x-investors', { count: numberOfInvestors })}
        </Typography>
      </Box>
    </Box>
  );
};

export default AssetsInPool;
