import React from 'react';
import { PriceBoxOverride } from './styles';
import { AssetsInPoolProps } from './types';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { ZigWhaleIcon } from '@zignaly-open/ui/icons';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatLocalizedDistance } from 'views/Dashboard/components/MyDashboard/util';

const AssetsInPool = ({
  prefixId,
  serviceId,
  assetsValue,
  numberOfInvestors,
  convertedValue,
  convertedValueCoin,
  createdAt,
  shorten = false,
  priceLabelSx,
}: AssetsInPoolProps) => {
  const { t } = useTranslation('marketplace');
  const priceSx = {
    color: 'neutral400',
    fontSize: '13px',
    fontWeight: 400,
    ...priceLabelSx,
  };
  return (
    <Box>
      <PriceBoxOverride
        id={prefixId && `${prefixId}__invested-${serviceId}`}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ZigPriceLabel
          usd
          value={assetsValue}
          variant={'h2'}
          component={'div'}
          color={'neutral200'}
          shorten={shorten}
        />
        {+assetsValue >= 200000 && (
          <ZigWhaleIcon
            style={{ fontSize: '15px', marginTop: '-5px' }}
            id={prefixId && `${prefixId}__whale-${serviceId}`}
          />
        )}
      </PriceBoxOverride>

      {typeof numberOfInvestors === 'number' && (
        <Box
          justifyContent='center'
          alignItems='start'
          id={prefixId && `${prefixId}__investors-${serviceId}`}
        >
          <ZigTypography variant='caption' component='p' color='neutral400'>
            {t('table.x-investors', { count: numberOfInvestors })}
          </ZigTypography>
        </Box>
      )}

      {createdAt && (
        <Box
          justifyContent='center'
          alignItems='start'
          id={prefixId && `${prefixId}__created-at`}
        >
          <ZigTypography variant='caption' component='p' color='neutral400'>
            {formatLocalizedDistance(new Date(), new Date(createdAt))}
          </ZigTypography>
        </Box>
      )}

      {typeof convertedValue === 'number' && (
        <Box
          justifyContent='center'
          alignItems='center'
          display={'flex'}
          id={prefixId && `${prefixId}__converted-${serviceId}`}
        >
          <ZigPriceLabel
            value={convertedValue}
            coin={convertedValueCoin}
            shorten={shorten}
            coinProps={priceSx}
            sx={{ mt: '3px', ...priceSx }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AssetsInPool;
