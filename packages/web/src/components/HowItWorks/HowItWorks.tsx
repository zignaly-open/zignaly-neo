import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

function HowItWorks() {
  const { t } = useTranslation('how-it-works');
  return (
    <Container maxWidth='sm'>
      <Typography variant={'h5'}>{t('how-it-works')}</Typography>
      <Typography marginTop={1}>{t('how-it-works-text')}</Typography>
    </Container>
  );
}

export default HowItWorks;
