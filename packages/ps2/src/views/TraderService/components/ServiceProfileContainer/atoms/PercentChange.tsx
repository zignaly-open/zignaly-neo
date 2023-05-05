import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { ChangeIndicatorSmall, PercentChangeContainer } from '../styles';
import { ZigTypography, shortenNumber } from '@zignaly-open/ui';
import { Variant } from '@mui/material/styles/createTypography';
import { Tooltip } from '@mui/material';

const PercentChange: React.FC<{
  id?: string;
  value: string | null | number;
  colored?: boolean;
  variant?: Variant;
  shorten?: boolean;
}> = ({ id, value, colored, variant = 'caption', shorten }) => {
  const { t } = useTranslation('common');
  const color = colored
    ? +value < 0
      ? 'redGraphOrError'
      : 'greenGraph'
    : 'neutral200';

  const isFinite = Number.isFinite(+value || 0);

  const {
    value: shortened,
    precision: shortenedPrecision,
    suffix: shortenSuffix,
  } = shortenNumber(+value);

  const tooltipWrap = (v: ReactElement) =>
    !isFinite ? (
      <Tooltip title={t(`infinitely-${+value > 0 ? 'better' : 'worse'}`)}>
        {v}
      </Tooltip>
    ) : (
      v
    );

  return tooltipWrap(
    <PercentChangeContainer component={'div'} color={color} id={id}>
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
      {isFinite ? (
        shorten ? (
          `${+Math.abs(shortened.toFixed(shortenedPrecision))}${shortenSuffix}`
        ) : (
          t('common:number', { value: Math.abs(+value || 0) })
        )
      ) : (
        <>{'∞'}</>
      )}

      <ChangeIndicatorSmall
        sx={{
          color: (theme) => theme.palette[color],
        }}
      >
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {'%'}
      </ChangeIndicatorSmall>
    </PercentChangeContainer>,
  );
};

export default PercentChange;
