import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@zignaly-open/ui';
import { Step, StepIcon, TypographyTitle, Layout } from './styles';
import { Stack } from '@mui/material';

const HowItWorks = () => {
  const { t } = useTranslation('how-it-works');
  return (
    <Layout
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={3}
      mb={{ xs: 2, md: 1 }}
    >
      <Typography variant='h2' color='neutral100'>
        {t('how-it-works')}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        mt={4}
        gap={{ xs: 4, md: 6 }}
      >
        <Step>
          <StepIcon />
          <TypographyTitle variant='h2' color='neutral100' component='h2'>
            {t('step1')}
          </TypographyTitle>
          <Typography variant='h4' color='neutral200' component='h4'>
            {t('step1-info')}
          </Typography>
        </Step>
        <Step>
          <StepIcon />
          <TypographyTitle variant='h2' color='neutral100' component='h2'>
            {t('step2')}
          </TypographyTitle>
          <Typography variant='h4' color='neutral200' component='h4'>
            {t('step2-info')}
          </Typography>
        </Step>
        <Step>
          <StepIcon />
          <TypographyTitle variant='h2' color='neutral100' component='h2'>
            {t('step3')}
          </TypographyTitle>
          <Typography variant='h4' color='neutral200' component='h4'>
            {t('step3-info')}
          </Typography>
        </Step>
        <Step>
          <StepIcon />
          <TypographyTitle variant='h2' color='neutral100' component='h2'>
            {t('step4')}
          </TypographyTitle>
          <Typography variant='h4' color='neutral200' component='h4'>
            {t('step4-info')}
          </Typography>
        </Step>
      </Stack>
    </Layout>
  );
};

export default HowItWorks;
