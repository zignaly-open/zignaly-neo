import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@zignaly-open/ui';
import { Step, TypographyTitle, Layout, StepDetails } from './styles';
import { Stack } from '@mui/material';
import { ReactComponent as BidIcon } from '../../../assets/icons/bid_gradient.svg';
import { ReactComponent as TrophyIcon } from '../../../assets/icons/trophy_gradient.svg';
import { ReactComponent as WalletIcon } from '../../../assets/icons/wallet_gradient.svg';
import { ReactComponent as ZigcoinIcon } from '../../../assets/icons/zigcoin_gradient.svg';

const HowItWorks = () => {
  const { t } = useTranslation('how-it-works');
  return (
    <Layout
      display='flex'
      flexDirection='column'
      alignItems='center'
      mb={{ xs: 5, md: 1 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        mt={4}
        gap={{ xs: 4, md: 6 }}
      >
        <Step>
          <WalletIcon width={100} height={100} />
          <StepDetails>
            <TypographyTitle variant='h2' color='neutral100' component='h2'>
              {t('step1')}
            </TypographyTitle>
            <Typography variant='h4' color='neutral200' component='h4'>
              {t('step1-info')}
            </Typography>
          </StepDetails>
        </Step>
        <Step>
          <ZigcoinIcon width={100} height={100} />
          <StepDetails>
            <TypographyTitle variant='h2' color='neutral100' component='h2'>
              {t('step2')}
            </TypographyTitle>
            <Typography variant='h4' color='neutral200' component='h4'>
              {t('step2-info')}
            </Typography>
          </StepDetails>
        </Step>
        <Step>
          <BidIcon width={100} height={100} />
          <StepDetails>
            <TypographyTitle variant='h2' color='neutral100' component='h2'>
              {t('step3')}
            </TypographyTitle>
            <Typography variant='h4' color='neutral200' component='h4'>
              {t('step3-info')}
            </Typography>
          </StepDetails>
        </Step>
        <Step>
          <TrophyIcon width={100} height={100} />
          <StepDetails>
            <TypographyTitle variant='h2' color='neutral100' component='h2'>
              {t('step4')}
            </TypographyTitle>
            <Typography variant='h4' color='neutral200' component='h4'>
              {t('step4-info')}
            </Typography>
          </StepDetails>
        </Step>
      </Stack>
    </Layout>
  );
};

export default HowItWorks;
