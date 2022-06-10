import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WhiteContainer from '../common/WhiteContainer';

function HowItWorks() {
  const { t } = useTranslation('how-it-works');
  return (
    <WhiteContainer maxWidth='sm'>
      <Typography variant={'h5'}>{t('how-it-works')}</Typography>
      <Typography marginTop={1}>{t('how-it-works-text')}</Typography>
    </WhiteContainer>
  );
}

export default HowItWorks;
