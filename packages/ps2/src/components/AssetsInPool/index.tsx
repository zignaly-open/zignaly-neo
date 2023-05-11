import React from 'react';
import { Icon, PriceBoxOverride } from './styles';
import { AssetsInPoolProps } from './types';
import { WhaleIcon, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
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
}: AssetsInPoolProps) => {
  const { t } = useTranslation('marketplace');
  return (
    <Box justifyContent='center' sx={{ gap: 2 }}>
      <PriceBoxOverride
        id={prefixId && `${prefixId}__invested-${serviceId}`}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
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
          <Icon>
            <WhaleIcon />
          </Icon>
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
          alignItems='start'
          id={prefixId && `${prefixId}__converted-${serviceId}`}
        >
          <ZigPriceLabel
            value={convertedValue}
            coin={convertedValueCoin}
            color='neutral300'
            coinProps={{ color: 'neutral300' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AssetsInPool;
