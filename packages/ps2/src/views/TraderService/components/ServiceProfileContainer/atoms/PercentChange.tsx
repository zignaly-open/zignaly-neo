import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { PercentageIndicatorSmall, PercentChangeContainer } from '../styles';
import { ZigTypography } from '@zignaly-open/ui';
import { Variant } from '@mui/material/styles/createTypography';

const PercentChange: React.FC<{
  value: string | null;
  colored?: boolean;
  variant?: Variant;
}> = ({ value, colored, variant = 'h6' }) => {
  const { t } = useTranslation('common');
  const color = colored
    ? +value > 0
      ? 'redGraphOrError'
      : 'greenGraph'
    : 'neutral200';
  return (
    <PercentChangeContainer component={'div'} color={color}>
      <ZigTypography variant={variant}>
        {+value > 0 ? (
          <ArrowDropUp
            sx={{
              color: (theme) => theme.palette[color],
              height: '0.75em',
              width: '0.75em',
            }}
          />
        ) : (
          <ArrowDropDown
            sx={{
              color: (theme) => theme.palette[color],
              height: '0.75em',
              width: '0.75em',
              position: 'relative',
              top: '0.15em',
            }}
          />
        )}
      </ZigTypography>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {+value > 0 ? '' : <>&ndash;</>}
      {t('common:number', { value: Math.abs(+value || 0) })}

      <PercentageIndicatorSmall
        sx={{
          color: (theme) => theme.palette[color],
        }}
      >
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {'%'}
      </PercentageIndicatorSmall>
    </PercentChangeContainer>
  );
};

export default PercentChange;
