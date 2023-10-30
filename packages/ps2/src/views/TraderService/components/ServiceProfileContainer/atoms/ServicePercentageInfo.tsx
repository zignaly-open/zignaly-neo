import React from 'react';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import PercentChange from './PercentChange';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getColorForNumber } from '../../../../../util/numbers';

const ServicePercentageInfo: React.FC<{
  title: string;
  value: string | number;
  percent: string;
  ssc: string;
  canShow?: boolean;
  id?: string;
}> = ({ title, value, ssc, percent, canShow, id }) => {
  const { t } = useTranslation('service');
  return (
    <>
      <ZigTypography textTransform='capitalize' color={'neutral300'}>
        {title}
      </ZigTypography>

      {canShow ? (
        <>
          <ZigPriceLabel
            id={id}
            sx={{ mb: 1 }}
            component='div'
            shorten
            variant={'h1'}
            color={getColorForNumber(value)}
            value={+value}
            coin={ssc}
            coinProps={{
              paddingTop: '3px',
            }}
          />
          <PercentChange value={percent} id={id && `${id}-pct`} />
        </>
      ) : (
        <Box
          sx={{
            minHeight: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tooltip title={t('not-enough-time')}>
            <ZigTypography
              variant={'h1'}
              component={'div'}
              color={'neutral400'}
              // eslint-disable-next-line i18next/no-literal-string
            >
              &mdash;
            </ZigTypography>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default ServicePercentageInfo;