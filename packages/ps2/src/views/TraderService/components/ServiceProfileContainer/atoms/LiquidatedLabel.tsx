import React from 'react';
import { useTranslation } from 'react-i18next';
import { LiquidatedLabel as LiquidatedLabelElement } from '../styles';
import { ZigTypography } from '@zignaly-open/ui';

const LiquidatedLabel: React.FC = () => {
  const { t } = useTranslation('service');
  return (
    <LiquidatedLabelElement sx={{ p: 2.5 }}>
      <ZigTypography
        fontWeight={'demibold'}
        variant={'body1'}
        color='redGraphOrError'
      >
        {t('liquidated')}
      </ZigTypography>
    </LiquidatedLabelElement>
  );
};

export default LiquidatedLabel;
