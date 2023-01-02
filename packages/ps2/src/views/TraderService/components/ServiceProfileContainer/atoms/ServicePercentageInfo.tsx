import React from 'react';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import PercentChange from './PercentChange';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ServicePercentageInfo: React.FC<{
  title: string;
  value: string;
  percent: string;
  ssc: string;
  canShow?: boolean;
}> = ({ title, value, ssc, percent, canShow }) => {
  const { t } = useTranslation('service');
  return (
    <>
      <ZigTypography color={'neutral300'}>{title}</ZigTypography>

      {canShow ? (
        <>
          <ZigPriceLabel
            sx={{ mb: 1 }}
            component='div'
            shorten
            variant={'h1'}
            color={+value > 0 ? 'greenGraph' : 'redGraphOrError'}
            value={+value}
            coin={ssc}
          />
          <PercentChange value={percent} />
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
