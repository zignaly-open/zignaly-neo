import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigLink, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { SubscriptionCardProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, Wrapper } from './styles';

const SubscriptionCard = ({
  name,
  price,
  successFeePct,
  status,
  subscriptionFinishesAt,
  durationTab,
}: SubscriptionCardProps) => {
  const { t } = useTranslation('subscriptions');
  return (
    <Box position={'relative'}>
      {status === 'active' && subscriptionFinishesAt && (
        <Wrapper>
          <ZigTypography variant={'body1'} color={'neutral000'}>
            {t('cards.renewal-date', { date: subscriptionFinishesAt })}
          </ZigTypography>
        </Wrapper>
      )}
      <Card status={status}>
        <Box display={'flex'} mb={'26px'} mt={'19px'}>
          <ZigTypography color={'neutral000'}>{t('cards.title')}</ZigTypography>
          &nbsp;
          <ZigTypography fontWeight={700} color={'neutral000'}>
            {t(`cards.packages.${name.split(' ')[1].toLowerCase()}`)}
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
          {durationTab === 'lifetime'
            ? t('cards.lifetime-price')
            : t('cards.yearly-license')}
        </ZigTypography>
        <Box display={'flex'} gap={'3px'}>
          <CheckCircleOutlineIcon
            fontSize={'inherit'}
            sx={{ marginTop: '1px' }}
          />
          <ZigTypography mb={'25px'} color={'neutral000'}>
            {t('cards.fees', { fee: successFeePct })}
          </ZigTypography>
        </Box>
        <ZigLink
          href={process.env.SUBSCRIBE_URL}
          target={'_blank'}
          sx={{ width: '100%' }}
        >
          <ZigButton
            size={'large'}
            fullWidth
            disabled={status !== 'accessible'}
          >
            {status === 'active'
              ? t('cards.your-subscription')
              : t('cards.get-started')}
          </ZigButton>
        </ZigLink>
      </Card>
    </Box>
  );
};
export default SubscriptionCard;
