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
  sx?: SxProps;
  priceLabelSx?: SxProps;
  percentSx?: SxProps;
  id?: string;
}> = ({
  title,
  value,
  ssc,
  percent,
  canShow,
  id,
  priceLabelSx,
  percentSx,
  sx,
}) => {
  const { t } = useTranslation('service');
  const priceSx = {
    fontSize: '13px',
    color: 'neutral400',
    fontWeight: 400,
    ...priceLabelSx,
  };

  return (
    <>
      <ZigTypography
        textTransform='capitalize'
        sx={{
          color: 'neutral300',
          lineHeight: '23px',
          mb: '10px',
          ...sx,
        }}
        id={id && `${id}-label`}
      >
        {title}
      </ZigTypography>

      {canShow ? (
        <>
          <PercentChange
            value={percent}
            id={id && `${id}-pct`}
            sx={{
              fontSize: '18px',
              lineHeight: '28px',
              mb: '4px',
              ...percentSx,
            }}
            showSignDoc={+percent * +value < 0}
            showTrophy={+percent >= 100}
          />
          <ZigPriceLabel
            id={id}
            component='div'
            shorten
            value={+value}
            coin={ssc}
            coinProps={priceSx}
            sx={priceSx}
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
