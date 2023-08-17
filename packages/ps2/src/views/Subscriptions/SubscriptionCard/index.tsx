import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigLink, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { SubscriptionCardProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, Wrapper } from './styles';

// TODO: remove hardcoded quantwise renewal date
// TODO: currency should be dynamic
const SubscriptionCard = ({
  name,
  price,
  successFeePct,
  status,
  subscriptionFinishesAt,
}: SubscriptionCardProps) => {
  const { t } = useTranslation('subscriptions');
  return (
    <Box position={'relative'}>
      {status === 1 && (
        <Wrapper>
          <ZigTypography variant={'body1'} color={'neutral000'}>
            {t('quantwise.renewal-date', { date: subscriptionFinishesAt })}
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
            {t(`quantwise.packages.${name.split(' ')[1].toLowerCase()}`)}
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
            {t('quantwise.fees', { fee: successFeePct })}
          </ZigTypography>
        </Box>
        <ZigLink
          href={process.env.QUANTWISE_URL}
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
export default SubscriptionCard;
