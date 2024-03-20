import React from 'react';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import PercentChange from './PercentChange';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/system';

const ServicePercentageInfo: React.FC<{
  title: string;
  value: string | number;
  percent: string;
  ssc: string;
  canShow?: boolean;
  priceLabelSx?: SxProps;
  id?: string;
}> = ({ title, value, ssc, percent, canShow, id, priceLabelSx }) => {
  const { t } = useTranslation('service');

  return (
    <>
      <ZigTypography
        textTransform='capitalize'
        color={'neutral300'}
        lineHeight={'23px'}
        sx={{ mb: '10px' }}
        id={id && `${id}-label`}
      >
        {title}
      </ZigTypography>

      {canShow ? (
        <>
          <PercentChange
            value={percent}
            id={id && `${id}-pct`}
            sx={{ fontSize: '18px' }}
            showSignDoc={+percent * +value < 0}
            showTrophy={+percent >= 100}
          />
          <ZigPriceLabel
            id={id}
            component='div'
            shorten
            value={+value}
            coin={ssc}
            color='neutral300'
            coinProps={{ color: 'neutral300' }}
            sx={{ fontSize: '13px', ...priceLabelSx }}
          />
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
