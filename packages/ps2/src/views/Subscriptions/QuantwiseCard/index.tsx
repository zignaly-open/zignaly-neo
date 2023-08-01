import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box, useTheme } from '@mui/material';
import { QuantwiseCardProps } from './types';
import { CrossedPrice } from './styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const QuantwiseCard = ({
  packageSub,
  startPrice,
  price,
  fee,
  status,
}: QuantwiseCardProps) => {
  const { t } = useTranslation('subscriptions');
  const theme = useTheme();
  return (
    <Box position={'relative'}>
      {status === 1 && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            top: '44px',
            left: 0,
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.neutral400,
            zIndex: -10,
            borderRadius: '10px',
            padding: '0 10px',
            paddingBottom: '7px',
            transform: 'scale(1.05)',
          }}
        >
          <ZigTypography variant={'body1'} color={'neutral000'}>
            {t('quantwise.renewal-date', { date: 'July 18th, 2024' })}
          </ZigTypography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: status === 0 ? 0.5 : 1,
          backgroundColor:
            status === 1 ? theme.palette.neutral600 : theme.palette.neutral700,
          borderRadius: '10px',
          padding: '16px 20px',
          border:
            status === 1 ? `2px solid ${theme.palette.neutral500}` : 'unset',
          transform: status === 1 ? 'scale(1.05)' : 'unset',
          position: 'relative',
        }}
      >
        <Box display={'flex'} mb={'26px'} mt={'19px'}>
          <ZigTypography color={'neutral000'}>
            {t('quantwise.quantwise')}
          </ZigTypography>
          &nbsp;
          <ZigTypography fontWeight={700} color={'neutral000'}>
            {t(`quantwise.packages.${packageSub}`)}
          </ZigTypography>
        </Box>
        <CrossedPrice
          fontWeight={700}
          variant={'h1'}
          color={'neutral200'}
          fontSize={'28px'}
          letterSpacing={1}
        >
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {startPrice}&#8364;
        </CrossedPrice>
        <ZigTypography
          fontWeight={700}
          variant={'h1'}
          fontSize={'44px'}
          color={'neutral000'}
          mb={0}
          letterSpacing={1}
        >
          {/* eslint-disable-next-line i18next/no-literal-string */}
          {price}&#8364;
        </ZigTypography>
        <ZigTypography mt={'-4px'} variant={'body1'} mb={'30px'}>
          {t('quantwise.license')}
        </ZigTypography>
        <Box display={'flex'} gap={'3px'}>
          <CheckCircleOutlineIcon
            fontSize={'inherit'}
            sx={{ marginTop: '1px' }}
          />
          <ZigTypography mb={'25px'} color={'neutral000'}>
            {t('quantwise.fees', { fee })}
          </ZigTypography>
        </Box>

        <ZigButton size={'large'} fullWidth disabled={status !== 2}>
          {status === 1
            ? t('quantwise.your-subscription')
            : t('quantwise.get-started')}
        </ZigButton>
      </Box>
    </Box>
  );
};
export default QuantwiseCard;
