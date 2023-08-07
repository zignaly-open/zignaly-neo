import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigLink, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { QuantwiseCardProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, Wrapper } from './styles';

const QuantwiseCard = ({
  packageSub,
  price,
  fee,
  status,
}: QuantwiseCardProps) => {
  const { t } = useTranslation('subscriptions');
  return (
    <Box position={'relative'}>
      {status === 1 && (
        <Wrapper>
          <ZigTypography variant={'body1'} color={'neutral000'}>
            {t('quantwise.renewal-date', { date: 'July 18th, 2024' })}
          </ZigTypography>
        </Wrapper>
      )}
      <Card status={status}>
        <Box display={'flex'} mb={'26px'} mt={'19px'}>
          <ZigTypography color={'neutral000'}>
            {t('quantwise.quantwise')}
          </ZigTypography>
          &nbsp;
          <ZigTypography fontWeight={700} color={'neutral000'}>
            {t(`quantwise.packages.${packageSub}`)}
          </ZigTypography>
        </Box>
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
        <ZigLink
          href={'http://shop.quantwise.ai/'}
          target={'_blank'}
          sx={{ width: '100%' }}
        >
          <ZigButton size={'large'} fullWidth disabled={status !== 2}>
            {status === 1
              ? t('quantwise.your-subscription')
              : t('quantwise.get-started')}
          </ZigButton>
        </ZigLink>
      </Card>
    </Box>
  );
};
export default QuantwiseCard;
