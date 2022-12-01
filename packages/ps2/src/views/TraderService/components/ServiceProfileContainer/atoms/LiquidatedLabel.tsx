import React from 'react';
import { useTranslation } from 'react-i18next';
import { LiquidatedLabel as LiquidatedLabelElement } from '../styles';
import { Typography } from '@zignaly-open/ui';

const LiquidatedLabel: React.FC = () => {
  const { t } = useTranslation('service');
  return (
    <LiquidatedLabelElement sx={{ p: 2.5 }}>
      <Typography
        weight={'demibold'}
        variant={'buttonxl'}
        color='redGraphOrError'
      >
        {t('liquidated')}
      </Typography>
    </LiquidatedLabelElement>
  );
};

export default LiquidatedLabel;
