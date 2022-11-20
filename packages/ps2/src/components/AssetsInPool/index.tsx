import React from 'react';
import { BlockTypography, Icon, PriceBoxOverride } from './styles';
import { AssetsInPoolProps } from './types';
import { UsdPriceLabel, WhaleIcon } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PriceLabel } from '@zignaly-open/ui';

const AssetsInPool = ({
  assetsValue,
  numberOfInvestors,
  convertedValue,
  convertedValueCoin,
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
        <UsdPriceLabel
          value={assetsValue}
          style={{ fontSize: '18px', lineHeight: '28px' }}
        />
        {+assetsValue >= 200000 && (
          <Icon>
            <WhaleIcon />
          </Icon>
        )}
      </PriceBoxOverride>

      {typeof numberOfInvestors === 'number' && (
        <Box justifyContent='center' alignItems='start'>
          <BlockTypography variant='h5' color='neutral400'>
            {t('table.x-investors', { count: numberOfInvestors })}
          </BlockTypography>
        </Box>
      )}

      {typeof convertedValue === 'number' && (
        <Box justifyContent='center' alignItems='start'>
          <PriceLabel value={convertedValue} coin={convertedValueCoin} />
        </Box>
      )}
    </Box>
  );
};

export default AssetsInPool;
